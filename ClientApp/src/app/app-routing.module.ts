import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];


export const isIframe = window !== window.parent && !window.opener;


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
        initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
