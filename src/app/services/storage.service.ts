import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../models/field-group';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private selectedFieldGroupSubject = new BehaviorSubject<FieldGroup | null>(JSON.parse(localStorage.getItem('selectedFieldGroup') || 'null'));
  selectedFieldGroup$ = this.selectedFieldGroupSubject.asObservable();

  setSelectedFieldGroup(group: FieldGroup) {
    this.selectedFieldGroupSubject.next(group);
    localStorage.setItem('selectedFieldGroup', JSON.stringify(group));
  }

  clearSelectedFieldGroup() {
    this.selectedFieldGroupSubject.next(null);
    localStorage.removeItem('selectedFieldGroup');
  }
}
