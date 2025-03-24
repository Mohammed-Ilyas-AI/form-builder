import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../models/field-group';

@Injectable({ providedIn: 'root' })
export class FieldGroupService {
  private defaultGroups: FieldGroup[] = [
    { id: 1, name: 'AMC Reports', description: 'Report details', elements: [], type: 'default' },
    { id: 2, name: 'HVAC Repair', description: 'HVAC service details', elements: [], type: 'default' },
    { id: 3, name: 'Electrical Inspection', description: 'Inspection details', elements: [], type: 'default' },
    { id: 4, name: 'Plumbing Checklist', description: 'Checklist for plumbing', elements: [], type: 'default' }
  ];

  private fieldGroupsSubject = new BehaviorSubject<FieldGroup[]>([...this.defaultGroups]);
  fieldGroups$ = this.fieldGroupsSubject.asObservable();

  constructor() {}

  getFieldGroups(): FieldGroup[] {
    return this.fieldGroupsSubject.value;
  }

  addFieldGroup(name: string, description: string, type: 'default' | 'created' | 'copied') {
    const updatedGroups = [...this.fieldGroupsSubject.value, { id: Date.now(), name, description, elements: [], type }];
    this.fieldGroupsSubject.next(updatedGroups);
  }

  updateFieldGroup(updatedGroup: FieldGroup) {
    const groups = this.fieldGroupsSubject.value.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    this.fieldGroupsSubject.next(groups);
  }
}
