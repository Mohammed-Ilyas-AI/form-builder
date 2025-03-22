import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-left-pane',
  imports: [CommonModule, DragDropModule],
  templateUrl: './left-pane.component.html',
  styleUrl: './left-pane.component.css'
})
export class LeftPaneComponent implements OnInit {
  fieldGroups: any[] = [];

  constructor(private storageService: LocalStorageService) {}

  ngOnInit() {
    this.loadFieldGroups();
  }

  async loadFieldGroups() {
    this.fieldGroups = await this.storageService.getFieldGroups();
  }

  createFieldGroup() {
    this.storageService.createFieldGroup('New Field Group', 'Description here...');
    this.loadFieldGroups(); // Reload field groups after creation
  }

  selectFieldGroup(group: any) {
    this.storageService.setSelectedFieldGroup(group);
  }

  reorderGroups(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.fieldGroups, event.previousIndex, event.currentIndex);
  }
}
