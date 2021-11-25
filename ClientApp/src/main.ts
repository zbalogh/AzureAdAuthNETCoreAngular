import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { map } from 'rxjs/operators';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}


export const MSAL_CONFIGURATION_DATA: any = {
  tenantId: 'n/a',
  clientId: 'n/a',
}


function fetchMSALConfiguration(): Promise<boolean> {

    const http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));

    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('/api/msalconfig')   //msal-config.json
        .pipe(
          map((data: any) => {
            MSAL_CONFIGURATION_DATA.tenantId = data.tenantId;
            MSAL_CONFIGURATION_DATA.clientId = data.clientId;
            console.log("MSAL configuration fetched.");
            resolve(true);
          })
        ).subscribe();
    });
}


fetchMSALConfiguration().then(b => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
