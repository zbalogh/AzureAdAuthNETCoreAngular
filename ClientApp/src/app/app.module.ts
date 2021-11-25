import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AppConfigService } from './app-config.service';

import { MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { MSAL_CONFIGURATION_DATA } from '../main';
import { WeatherComponent } from './weather/weather.component';



export const isIEBrowser = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const msalRedirectUri = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

export const backendWebApiUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/api';

export const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';



/**
 * We initialize the 'AppConfigService' based on the MSAL Config Data.
 * The AppConfigService can be injected from any component.
 */
function InitializeAppConfig(config: AppConfigService): (() => Promise<boolean>)
{
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      config.tenantId = MSAL_CONFIGURATION_DATA.tenantId;
      config.clientId = MSAL_CONFIGURATION_DATA.clientId;
      console.log("AppConfigService initialized.");
      resolve(true);
    });
  };
}


function MSALInstanceFactory(): IPublicClientApplication
{
  console.log("MSALInstanceFactory(): tenantId=" + MSAL_CONFIGURATION_DATA.tenantId);
  console.log("MSALInstanceFactory(): clientId=" + MSAL_CONFIGURATION_DATA.clientId);

  return new PublicClientApplication({
    auth: {
      clientId: MSAL_CONFIGURATION_DATA.clientId, // This is your client ID
      authority: 'https://login.microsoftonline.com/' + MSAL_CONFIGURATION_DATA.tenantId, // This is your tenant ID
      redirectUri: msalRedirectUri, // This is your redirect URI called after successful login
      postLogoutRedirectUri: msalRedirectUri  // This is your post-logout redirect URI called after succesful logout
    },
    cache: {
      cacheLocation: 'localStorage', // We prefer using local storage for cache
      storeAuthStateInCookie: isIEBrowser,  // Set to true for Internet Explorer 11, otherwise false
    }
  });
}


function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration
{
  return {
    interactionType: InteractionType.Popup, // MSAL Interceptor Configuration
    protectedResourceMap: new Map([
      [GRAPH_ENDPOINT, ['user.read']], // Enable 'user.read' API access for MS Graph API
      [backendWebApiUrl, ['api://' + MSAL_CONFIGURATION_DATA.clientId + '/api-access']] // enable Web API access for all resources in the "/api" path
    ])
  };
}


function MSALGuardConfigFactory(): MsalGuardConfiguration
{
  return {
    interactionType: InteractionType.Popup, // MSAL Guard Configuration
    authRequest: {
      scopes: [
        'user.read',
        'api://' + MSAL_CONFIGURATION_DATA.clientId + '/api-access'
      ]
    }
  };
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    WeatherComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    AppRoutingModule,
    MsalModule
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: InitializeAppConfig,
      deps: [
        AppConfigService
      ],
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,  // MsalService added as provider
    MsalGuard     // MsalGuard added as provider
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
