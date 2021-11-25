import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { map } from 'rxjs/operators';
import { GRAPH_ENDPOINT } from '../app.module';


type ProfileType = {
  displayName?: string,
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  mail?: string,
  jobTitle?: string,
  mobilePhone?: string
};


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;

  username: string;

  profile!: ProfileType;

  photo: any;

  constructor(private http: HttpClient,
    private msalService: MsalService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit()
  {
    // read the account object
    this.readAccountInfo();

    // load profile info of the logged user
    this.getUserProfile();

    // load photo of the logged user
    this.getUserPhoto();
  }

  readAccountInfo()
  {
    if (this.msalService.instance) {
        const accounts: AccountInfo[] = this.msalService.instance.getAllAccounts();
        if (accounts && accounts.length > 0) {
            const account = accounts[0];
            this.name = account.name;
            this.username = account.username;
        }
    }
  }

  getUserProfile()
  {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
          this.profile = profile;
      },
      error => console.error(error)
    );
  }

  getUserPhoto()
  {
    let requestUrl = GRAPH_ENDPOINT + "/photos/48x48/$value";

    this.http.get(requestUrl, { responseType: "blob" })
      .pipe(map(result => {
        let url = window.URL;
        return this.sanitizer.bypassSecurityTrustUrl(url.createObjectURL(result));
      }))
      .subscribe(photo => {
        this.photo = photo;
      },
      error => console.error(error)
    );
  }

}
