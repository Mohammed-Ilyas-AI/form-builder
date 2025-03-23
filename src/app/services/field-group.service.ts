import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../models/field-group';

@Injectable({ providedIn: 'root' })
export class FieldGroupService {
  private fieldGroupsSubject = new BehaviorSubject<FieldGroup[]>([]);
  fieldGroups$ = this.fieldGroupsSubject.asObservable();

  constructor() {
    this.loadDefaults();
  }

  private loadDefaults() {
    const defaultGroups: FieldGroup[] = JSON.parse(localStorage.getItem('fieldGroups') || '[]');
    this.fieldGroupsSubject.next(defaultGroups.length ? defaultGroups : [
      { id: 1, name: 'AMC Reports', description: 'Report details', elements: [] },
      { id: 2, name: 'HVAC Repair', description: 'HVAC service details', elements: [] },
      { id: 3, name: 'AMC Yearly', description: 'Yearly maintenance', elements: [] },
      { id: 4, name: 'AMC Installations - Tier 3', description: 'Installation details', elements: [] }
    ]);
  }

  getFieldGroups() {
    return this.fieldGroupsSubject.value;
  }

  addFieldGroup(name: string, description: string) {
    const updatedGroups = [...this.fieldGroupsSubject.value, { id: Date.now(), name, description, elements: [] }];
    this.fieldGroupsSubject.next(updatedGroups);
    localStorage.setItem('fieldGroups', JSON.stringify(updatedGroups));
  }

  editFieldGroup(groupId: number, name: string, description: string) {
    const updatedGroups = this.fieldGroupsSubject.value.map(group =>
      group.id === groupId ? { ...group, name, description } : group
    );
    this.fieldGroupsSubject.next(updatedGroups);
    localStorage.setItem('fieldGroups', JSON.stringify(updatedGroups));
  }

  copyFieldGroup(groupId: number) {
    const originalGroup = this.fieldGroupsSubject.value.find(group => group.id === groupId);
    if (originalGroup) {
      const copiedGroup = { ...originalGroup, id: Date.now(), name: originalGroup.name + ' - Copy' };
      this.addFieldGroup(copiedGroup.name, copiedGroup.description);
    }
  }

  deleteFieldGroup(groupId: number) {
    const updatedGroups = this.fieldGroupsSubject.value.filter(group => group.id !== groupId);
    this.fieldGroupsSubject.next(updatedGroups);
    localStorage.setItem('fieldGroups', JSON.stringify(updatedGroups));
  }
}
