import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { backendWebApiUrl } from '../app.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data : any = {};

  constructor(private http: HttpClient, private config: AppConfigService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData()
  {
    //console.log("clientId=" + this.config.clientId);
    //console.log("tenantId=" + this.config.tenantId);

    const endpoint = backendWebApiUrl + "/weatherforecast";

    this.http.get(endpoint).toPromise()
      .then(data => {
        this.data = data;
        //console.log(data);
        console.log('Loaded weather forecast data.');
      });
  }

  getDataAsString() {
    return JSON.stringify(this.data);
  }

}
