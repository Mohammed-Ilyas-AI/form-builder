import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormElement } from '../models/form-element';

@Injectable({ providedIn: 'root' })
export class FormElementService {
  private formElementsSubject = new BehaviorSubject<FormElement[]>(JSON.parse(localStorage.getItem('formElements') || '[]'));
  formElements$ = this.formElementsSubject.asObservable();

  constructor() {
    this.loadDefaults();
  }

  private async loadDefaults() {
    if (!this.formElementsSubject.value.length) {
      try {
        const response = await fetch('/assets/data/form-elements.json');
        if (!response.ok) throw new Error('Failed to load form elements');
        const data = await response.json();
        this.formElementsSubject.next(data);
        localStorage.setItem('formElements', JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
  }

  addElementToFieldGroup(fieldGroupId: number, element: FormElement) {
    const elements = [...this.formElementsSubject.value, element];
    this.formElementsSubject.next(elements);
    localStorage.setItem('formElements', JSON.stringify(elements));
  }

  deleteElementFromFieldGroup(elementId: string) {
    const updatedElements = this.formElementsSubject.value.filter(e => e.id !== elementId);
    this.formElementsSubject.next(updatedElements);
    localStorage.setItem('formElements', JSON.stringify(updatedElements));
  }

  searchFormElements(query: string): FormElement[] {
    return this.formElementsSubject.value.filter(element =>
      element.label.toLowerCase().includes(query.toLowerCase())
    );
  }
}
