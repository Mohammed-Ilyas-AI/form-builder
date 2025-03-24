import { Component, HostListener, OnInit } from '@angular/core';
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
  defaultFieldGroups: FieldGroup[] = [];
  createdFieldGroups: FieldGroup[] = [];
  copiedFieldGroups: FieldGroup[] = [];
  selectedGroupId: number | null = null;
  screenSize: number = window.innerWidth;

  constructor(private fieldGroupService: FieldGroupService, private storageService: StorageService) {}

  ngOnInit() {
    this.fieldGroupService.fieldGroups$.subscribe(groups => {
      this.defaultFieldGroups = groups.filter(group => group.type === 'default');
      this.createdFieldGroups = groups.filter(group => group.type === 'created');
      this.copiedFieldGroups = groups.filter(group => group.type === 'copied');
    });

    this.storageService.selectedFieldGroup$.subscribe(selectedGroup => {
      this.selectedGroupId = selectedGroup ? selectedGroup.id : null;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenSize = window.innerWidth;
  }

  selectFieldGroup(group: FieldGroup) {
    this.storageService.setSelectedFieldGroup(group);
  }

  createFieldGroup() {
    this.fieldGroupService.addFieldGroup('New Field Group', 'Enter description here...', 'created');
  }

  reorderGroups(event: CdkDragDrop<FieldGroup[]>, groupType: string) {
    if (groupType === 'default') {
      moveItemInArray(this.defaultFieldGroups, event.previousIndex, event.currentIndex);
    } else if (groupType === 'created') {
      moveItemInArray(this.createdFieldGroups, event.previousIndex, event.currentIndex);
    } else if (groupType === 'copied') {
      moveItemInArray(this.copiedFieldGroups, event.previousIndex, event.currentIndex);
    }
  }
}
