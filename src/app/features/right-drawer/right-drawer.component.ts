import { Component } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { FieldProperty } from '../../models/field-property';

@Component({
  selector: 'app-right-drawer',
  imports: [CommonModule, FormsModule],
  templateUrl: './right-drawer.component.html',
  styleUrl: './right-drawer.component.css'
})
export class RightDrawerComponent {
  fieldProperties: FieldProperty[] = [];
  selectedField: any = null;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadFieldProperties();
  }

  private async loadFieldProperties() {
    try {
      const response = await fetch('/assets/data/field-properties.json');
      if (!response.ok) throw new Error('Failed to load field properties');
      this.fieldProperties = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  updateFieldProperty(property: string, value: any) {
    if (this.selectedField) {
      (this.selectedField as any)[property] = value;
    }
  }
}
