import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormElement } from '../models/form-element'; // ✅ Use your model file

export interface FormCategory {
  category: string;
  fields: FormElement[];
}

@Injectable({ providedIn: 'root' })
export class FormElementService {
  private categoriesSubject = new BehaviorSubject<FormCategory[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor() {
    this.loadFromJson();
  }

  /** Load from /assets/data/form-elements.json */
  private async loadFromJson() {
    try {
      const res = await fetch('assets/data/form-elements.json');
      if (!res.ok) throw new Error('Failed to load form-elements.json');

      const data: FormCategory[] = await res.json();
      this.categoriesSubject.next(data);
    } catch (error) {
      console.error('Error loading form elements:', error);
    }
  }

  /** Filter categories by search query */
  filterCategories(query: string): FormCategory[] {
    const currentData = this.categoriesSubject.value;
    if (!query.trim()) return currentData;

    const lowerQuery = query.toLowerCase();
    return currentData
      .map(category => ({
        category: category.category,
        fields: category.fields.filter(el =>
          el.label.toLowerCase().includes(lowerQuery)
        )
      }))
      .filter(cat => cat.fields.length > 0);
  }
}
