import { Component, DoCheck, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormRendererComponent } from "../../features/form-renderer/form-renderer.component";

@Component({
  selector: 'app-middle-pane',
  imports: [CommonModule, FormsModule, FormRendererComponent],
  templateUrl: './middle-pane.component.html',
  styleUrl: './middle-pane.component.css'
})
export class MiddlePaneComponent implements OnInit, DoCheck{
  selectedFieldGroup: any = null;
  isEditingTitle: boolean = false;
  isEditingDescription: boolean = false;

  constructor(private storageService: LocalStorageService) {}

  async ngOnInit() {
    this.selectedFieldGroup = this.storageService.getSelectedFieldGroup();
  }

  ngDoCheck() {
    const newSelectedGroup = this.storageService.getSelectedFieldGroup();
    if (this.selectedFieldGroup !== newSelectedGroup) {
      this.selectedFieldGroup = newSelectedGroup;
    }
  }

  /** ✅ Enable Editing Title */
  enableTitleEdit() {
    this.isEditingTitle = true;
  }

  /** ✅ Enable Editing Description */
  enableDescriptionEdit() {
    this.isEditingDescription = true;
  }

  /** ✅ Save Edited Title and Description */
  saveEdits() {
    this.isEditingTitle = false;
    this.isEditingDescription = false;
  }

  /** ✅ Copy the Field Group */
  copyFieldGroup() {
    if (!this.selectedFieldGroup) return;
    const copiedGroup = { ...this.selectedFieldGroup, id: Date.now(), name: this.selectedFieldGroup.name + ' - Copy' };
    this.storageService.createFieldGroup(copiedGroup.name, copiedGroup.description);
  }

  /** ✅ Delete the Field Group */
  deleteFieldGroup() {
    if (!this.selectedFieldGroup) return;
    this.storageService.deleteFieldGroup(this.selectedFieldGroup.id);
    this.selectedFieldGroup = null;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const fieldData = JSON.parse(event.dataTransfer?.getData('text/plain') || '{}');

    if (this.selectedFieldGroup) {
      this.storageService.addElementToFieldGroup(this.selectedFieldGroup.id, fieldData);
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  deleteElement(index: number) {
    if (this.selectedFieldGroup) {
      this.selectedFieldGroup.elements.splice(index, 1);
    }
  }

  copyElement(element: any) {
    if (this.selectedFieldGroup) {
      this.storageService.copyElementInFieldGroup(this.selectedFieldGroup.id, element.id);
    }
  }

  saveForm() {
    if (this.selectedFieldGroup) {
      this.storageService.exportForm(this.selectedFieldGroup.id);
    }
  }

  importForm(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.storageService.importForm(reader.result as string);
    };

    reader.readAsText(file);
  }
}
