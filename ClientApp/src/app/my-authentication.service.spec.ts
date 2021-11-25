import { TestBed } from '@angular/core/testing';

import { MyAuthenticationService } from './my-authentication.service';

describe('MyAuthenticationService', () => {
  let service: MyAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
