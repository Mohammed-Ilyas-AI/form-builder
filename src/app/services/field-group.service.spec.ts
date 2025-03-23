import { TestBed } from '@angular/core/testing';
import { FieldGroupService } from './field-group.service';
import { FieldGroup } from '../models/field-group';

describe('FieldGroupService', () => {
  let service: FieldGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load default field groups on init', () => {
    const defaultGroups: FieldGroup[] = service.getFieldGroups();
    expect(defaultGroups.length).toBeGreaterThan(0);
  });

  it('should add a new field group', () => {
    const initialLength = service.getFieldGroups().length;
    service.addFieldGroup('New Test Group', 'Test Description');
    expect(service.getFieldGroups().length).toBe(initialLength + 1);
  });

  it('should not remove existing field groups when adding a new one', () => {
    const initialGroups = service.getFieldGroups();
    service.addFieldGroup('Another Test Group', 'Another Description');
    expect(service.getFieldGroups()).toEqual(jasmine.arrayContaining(initialGroups));
  });
});
