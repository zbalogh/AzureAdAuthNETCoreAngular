import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  tenantId: string = 'n/a';
  clientId: string = 'n/a';

  constructor() { }
}
