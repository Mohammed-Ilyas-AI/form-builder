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
    expect(defaultGroups.every(group => group.type === 'default')).toBeTrue();
  });

  it('should add a new field group under "Created Field Groups"', () => {
    const initialLength = service.getFieldGroups().length;
    service.addFieldGroup('New Test Group', 'Test Description', 'created');
    expect(service.getFieldGroups().length).toBe(initialLength + 1);
    expect(service.getFieldGroups().some(group => group.type === 'created')).toBeTrue();
  });

  it('should add a copied field group under "Copied Field Groups"', () => {
    service.addFieldGroup('Copied Group', 'Copied Desc', 'copied');
    expect(service.getFieldGroups().some(group => group.type === 'copied')).toBeTrue();
  });

  it('should not remove existing field groups when adding a new one', () => {
    const initialGroups = service.getFieldGroups();
    service.addFieldGroup('Another Test Group', 'Another Description', 'created');
    expect(service.getFieldGroups()).toEqual(jasmine.arrayContaining(initialGroups));
  });

  it('should correctly update field group properties', () => {
    const testGroup = service.getFieldGroups()[0];
    service.updateFieldGroup({ ...testGroup, name: 'Updated Name' });
    expect(service.getFieldGroups().find(group => group.id === testGroup.id)?.name).toBe('Updated Name');
  });
});
