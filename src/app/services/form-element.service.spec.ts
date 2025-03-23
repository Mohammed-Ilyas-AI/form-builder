import { TestBed } from '@angular/core/testing';

import { FormElementService } from './form-element.service';

describe('FormElementService', () => {
  let service: FormElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
