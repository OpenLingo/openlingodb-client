import { TestBed } from '@angular/core/testing';
import { NounService } from './noun.service';

describe('NounService', () => {
  let service: NounService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NounService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
