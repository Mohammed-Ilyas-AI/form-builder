import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormCategory, FormElementService } from '../../services/form-element.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-pane',
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './right-pane.component.html',
  styleUrl: './right-pane.component.css',
})
export class RightPaneComponent implements OnInit {
  searchQuery: string = '';
  categories: FormCategory[] = [];

  constructor(private formElementService: FormElementService) {}

  ngOnInit(): void {
    this.formElementService.categories$.subscribe(data => {
      this.categories = data;
    });
  }

  get filteredCategories(): FormCategory[] {
    return this.formElementService.filterCategories(this.searchQuery);
  }

  // Optional: Drag start event if you want to use DragDrop API
  onDragStart(event: DragEvent, element: any) {
    event.dataTransfer?.setData('formElement', JSON.stringify(element));
  }
}
