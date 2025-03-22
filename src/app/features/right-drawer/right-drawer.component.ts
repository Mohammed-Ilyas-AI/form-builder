import { Component } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-drawer',
  imports: [CommonModule, FormsModule],
  templateUrl: './right-drawer.component.html',
  styleUrl: './right-drawer.component.css'
})
export class RightDrawerComponent {
  selectedField: any = null;
  fieldProperties: any[] = [];

  constructor(private storageService: LocalStorageService) {}

  async ngOnInit() {
    this.fieldProperties = await this.storageService.getFieldProperties();
  }

  setSelectedField(field: any) {
    this.selectedField = field;
  }

  updateFieldProperty(property: string, value: any) {
    if (this.selectedField) {
      this.selectedField[property] = value;
    }
  }
}
