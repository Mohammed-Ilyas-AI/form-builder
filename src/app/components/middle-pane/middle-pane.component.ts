import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { DragService } from '../../services/drag.service';

@Component({
  selector: 'app-middle-pane',
  imports: [CommonModule, FormsModule],
  templateUrl: './middle-pane.component.html',
  styleUrl: './middle-pane.component.css'
})
export class MiddlePaneComponent implements OnInit{
  selectedFieldGroup: any = null;
  fieldGroups: any[] = [];
  formElements: any[] = [];
  formGroup: FormGroup = new FormGroup({});

  constructor(private dragService: DragService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.fieldGroups = this.storageService.loadForm();
    this.dragService.getDraggedItem().subscribe((item) => {
      if (item) {
        this.addFormElement(item);
      }
    });
  }

  selectFieldGroup(group: any): void {
    this.selectedFieldGroup = group;
    this.formElements = group.elements || [];
  }

  editFieldGroupName(event: any): void {
    this.selectedFieldGroup.name = event.target.value;
    this.updateStorage();
  }

  editDescription(event: any): void {
    this.selectedFieldGroup.description = event.target.value;
    this.updateStorage();
  }

  addFormElement(element: any): void {
    this.formElements.push(element);
    this.selectedFieldGroup.elements = this.formElements;
    this.updateStorage();
  }

  removeElement(element: any): void {
    this.formElements = this.formElements.filter((el) => el !== element);
    this.selectedFieldGroup.elements = this.formElements;
    this.updateStorage();
  }

  saveForm(): void {
    this.storageService.saveForm(this.fieldGroups);
  }

  previewForm(): void {
    console.log('Preview Form:', this.selectedFieldGroup);
  }

  exportForm(): void {
    const dataStr = JSON.stringify(this.selectedFieldGroup);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.selectedFieldGroup.name}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importForm(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFieldGroup = JSON.parse(e.target?.result as string);
        this.formElements = this.selectedFieldGroup.elements;
        this.updateStorage();
      };
      reader.readAsText(file);
    }
  }

  private updateStorage(): void {
    this.storageService.saveForm(this.fieldGroups);
  }
}
