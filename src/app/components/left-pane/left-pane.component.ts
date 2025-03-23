import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FieldGroup } from '../../models/field-group';
import { FieldGroupService } from '../../services/field-group.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-left-pane',
  imports: [CommonModule, DragDropModule],
  templateUrl: './left-pane.component.html',
  styleUrl: './left-pane.component.css'
})
export class LeftPaneComponent implements OnInit {
  fieldGroups: FieldGroup[] = [];

  constructor(private fieldGroupService: FieldGroupService, private storageService: StorageService) {}

  ngOnInit() {
    // Load field groups from the service (not from localStorage)
    this.fieldGroupService.fieldGroups$.subscribe(groups => {
      this.fieldGroups = groups;
    });
  }

  selectFieldGroup(group: FieldGroup) {
    this.storageService.setSelectedFieldGroup(group);
  }

  createFieldGroup() {
    this.fieldGroupService.addFieldGroup('New Field Group', 'Enter description here...');
  }

  reorderGroups(event: CdkDragDrop<FieldGroup[]>) {
    moveItemInArray(this.fieldGroups, event.previousIndex, event.currentIndex);
  }
}
