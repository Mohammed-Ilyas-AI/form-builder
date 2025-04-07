import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../models/field-group';
import { FieldGroupService } from './field-group.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private selectedFieldGroupSubject = new BehaviorSubject<FieldGroup | null>(null);
  selectedFieldGroup$ = this.selectedFieldGroupSubject.asObservable();

  constructor(private fieldGroupService: FieldGroupService) {
    const initialGroups = this.fieldGroupService.getFieldGroups();
    if (initialGroups.length > 0) {
      this.setSelectedFieldGroup(initialGroups[0]);
    }
  }

  setSelectedFieldGroup(group: FieldGroup | null) {
    this.selectedFieldGroupSubject.next(group);
  }

  updateSelectedFieldGroup(updatedGroup: FieldGroup) {
    this.fieldGroupService.updateFieldGroup(updatedGroup);
    this.setSelectedFieldGroup(updatedGroup);
  }

  copySelectedFieldGroup() {
    const original = this.selectedFieldGroupSubject.value;
    if (!original) return;

    const copied: FieldGroup = {
      ...original,
      id: Date.now(), // Unique ID
      name: `${original.name} (Copy)`,
      type: 'copied'
    };
    this.fieldGroupService.addFieldGroup(copied.name, copied.description || '', copied.type);
    this.setSelectedFieldGroup(copied);
  }

  deleteSelectedFieldGroup() {
    const groupToDelete = this.selectedFieldGroupSubject.value;
    if (!groupToDelete) return;

    const updatedGroups = this.fieldGroupService.getFieldGroups().filter(g => g.id !== groupToDelete.id);
    this.fieldGroupService['fieldGroupsSubject'].next(updatedGroups); // Direct update

    // Select the first group again or null
    this.setSelectedFieldGroup(updatedGroups[0] || null);
  }
}
