import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { FieldGroup } from '../../models/field-group';

@Component({
  selector: 'app-middle-pane',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './middle-pane.component.html',
  styleUrl: './middle-pane.component.css',
})
export class MiddlePaneComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  selectedGroup: FieldGroup | null = null;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.storageService.selectedFieldGroup$.subscribe((group) => {
      this.selectedGroup = group;
      if (group) {
        this.setFieldGroupData(group);
      } else {
        this.fieldGroups.clear();
      }
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      fieldGroups: this.fb.array([]),
    });
  }

  get fieldGroups(): FormArray {
    return this.form.get('fieldGroups') as FormArray;
  }

  setFieldGroupData(groupData: FieldGroup) {
    this.fieldGroups.clear();
    const fg = this.fb.group({
      title: [groupData.name || ''],
      description: [groupData.description || ''],
    });
    this.fieldGroups.push(fg);
  }

  enterEditMode() {
    this.isEditMode = true;
  }

  saveChanges() {
    if (!this.selectedGroup) return;

    const headerData = this.fieldGroups.at(0).value;
    const updatedGroup: FieldGroup = {
      ...this.selectedGroup,
      name: headerData.title,
      description: headerData.description,
    };
    this.storageService.updateSelectedFieldGroup(updatedGroup);
    this.isEditMode = false;
  }

  cancelEdit() {
    if (this.selectedGroup) {
      this.setFieldGroupData(this.selectedGroup);
    }
    this.isEditMode = false;
  }

  copyGroup() {
    this.storageService.copySelectedFieldGroup();
  }

  deleteGroup() {
    const confirmDelete = confirm(
      'Are you sure you want to delete this group?'
    );
    if (confirmDelete) {
      this.storageService.deleteSelectedFieldGroup();
      this.selectedGroup = null;
      this.form.reset();
    }
  }
}
