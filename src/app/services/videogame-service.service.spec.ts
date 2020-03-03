import { TestBed } from '@angular/core/testing';

import { VideogameServiceService } from './videogame-service.service';

describe('VideogameServiceService', () => {
  let service: VideogameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideogameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
