import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../models/field-group';

@Injectable({ providedIn: 'root' })
export class FieldGroupService {
  private defaultGroups: FieldGroup[] = [
    { id: 1, name: 'AMC Reports', description: 'Report details', elements: [] },
    { id: 2, name: 'HVAC Repair', description: 'HVAC service details', elements: [] },
    { id: 3, name: 'Electrical Inspection', description: 'Inspection details', elements: [] },
    { id: 4, name: 'Plumbing Checklist', description: 'Checklist for plumbing', elements: [] }
  ];

  private fieldGroupsSubject = new BehaviorSubject<FieldGroup[]>([...this.defaultGroups]);
  fieldGroups$ = this.fieldGroupsSubject.asObservable();

  constructor() {}

  addFieldGroup(name: string, description: string, type: 'default' | 'created' | 'copied') {
    const updatedGroups = [...this.fieldGroupsSubject.value, { id: Date.now(), name, description, elements: [], type }];
    this.fieldGroupsSubject.next(updatedGroups);
  }

  copyFieldGroup(group: FieldGroup) {
    this.addFieldGroup(group.name + ' (Copy)', group.description, 'copied');
  }

  deleteFieldGroup(id: number) {
    const updatedGroups = this.fieldGroupsSubject.value.filter(g => g.id !== id);
    this.fieldGroupsSubject.next(updatedGroups);
  }
}
