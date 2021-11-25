import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

import { MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AccountInfo, PopupRequest, RedirectRequest } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class MyAuthenticationService {

  isLoggedIn = false;

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService
  )
  {
    // initialize the "isLoggedIn" flag
    this.setLoggedInFlag();
  }


  /**
   * Login to Azure AD
   */
  login() {
    this.loginWithPopup();
  }

  private loginWithPopup()
  {
    let authObserver = {
      next: (result: any) => {
        console.log("login done");
        console.log(result);
        this.setLoggedInFlag();
      },
      error: (error: any) => console.log(error)
    };

    if (this.msalGuardConfig.authRequest) {
      const authReqest = {...this.msalGuardConfig.authRequest} as PopupRequest;
       this.authService.loginPopup(authReqest).subscribe(authObserver);
    } else {
      this.authService.loginPopup().subscribe(authObserver);
    }
  }

  private loginWithRedirect()
  {
    if (this.msalGuardConfig.authRequest) {
      const authRequest = {...this.msalGuardConfig.authRequest} as RedirectRequest;
      this.authService.loginRedirect(authRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  /**
   * Logout from Azure AD
   */
  logout() {
    this.logoutWithPopup();
  }

  private logoutWithPopup()
  {
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/home"
    })
    .subscribe({
      next: (result) => {
        console.log("logout done");
        console.log(result);
        this.setLoggedInFlag();
      },
      error: (error) => console.log(error)
    });
  }

  private logoutWithRedirect()
  {
    this.authService.logoutRedirect();
  }


  private setLoggedInFlag()
  {
    this.isLoggedIn = this.checkAccountInfo();
  }

  private checkAccountInfo() : boolean
  {
    if (this.authService.instance) {
      // get accounts
      const accounts : AccountInfo[] = this.authService.instance.getAllAccounts();
      // set flag if we have account info
      if (accounts && accounts.length > 0) {
        this.isLoggedIn = this.authService.instance.getAllAccounts().length > 0;
        // we are done, so return now
        return true;
      }
    }
    return false;
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

}
