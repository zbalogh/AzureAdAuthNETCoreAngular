import { Component, OnInit } from '@angular/core';

import { isIframe } from './app-routing.module';
import { MyAuthenticationService } from './my-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'msal-angular-tutorial';

  constructor(private myAuthService: MyAuthenticationService)
  { }

  ngOnInit() {
  }

  isUserLoggedIn() {
    return this.myAuthService.isUserLoggedIn();
  }

  login() {
    this.myAuthService.login();
  }

  logout() {
    this.myAuthService.logout();
  }

  isIframe() {
    return isIframe;
  }

}
