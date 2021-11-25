import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendWebApiUrl } from '../app.module';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  forecasts: WeatherForecast[];

  constructor(private http: HttpClient, private config: AppConfigService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData()
  {
    //console.log("clientId=" + this.config.clientId);
    //console.log("tenantId=" + this.config.tenantId);

    const endpoint = backendWebApiUrl + "/weatherforecast";

    this.http.get<WeatherForecast[]>(endpoint)
      .subscribe(result => {
        this.forecasts = result;
        console.log('Loaded weather forecast data.');
      },
        error => console.error(error)
    );
  }

}


interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
