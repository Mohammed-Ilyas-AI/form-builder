import { TestBed } from '@angular/core/testing';

import { FieldGroupService } from './field-group.service';

describe('FieldGroupService', () => {
  let service: FieldGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
