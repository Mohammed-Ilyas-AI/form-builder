import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../models/field-group';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private selectedFieldGroupSubject = new BehaviorSubject<FieldGroup | null>(JSON.parse(localStorage.getItem('selectedFieldGroup') || 'null'));
  private readonly STORAGE_KEY = 'savedForms';
  selectedFieldGroup$ = this.selectedFieldGroupSubject.asObservable();

  setSelectedFieldGroup(group: FieldGroup) {
    this.selectedFieldGroupSubject.next(group);
    localStorage.setItem('selectedFieldGroup', JSON.stringify(group));
  }

  clearSelectedFieldGroup() {
    this.selectedFieldGroupSubject.next(null);
    localStorage.removeItem('selectedFieldGroup');
  }

  saveForm(fieldGroups: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fieldGroups));
  }

  loadForm(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  removeFieldGroup(groupId: string): void {
    let fieldGroups = this.loadForm();
    fieldGroups = fieldGroups.filter((group) => group.id !== groupId);
    this.saveForm(fieldGroups);
  }
}
