import { TestBed } from '@angular/core/testing';

import { MancalaService } from './mancala.service';

describe('MancalaService', () => {
  let service: MancalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MancalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
