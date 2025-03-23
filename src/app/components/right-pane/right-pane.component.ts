import { Component } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormElementService } from '../../services/form-element.service';
interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  icon?: string;
  options?: string[];
}

@Component({
  selector: 'app-right-pane',
  imports: [CommonModule, DragDropModule],
  templateUrl: './right-pane.component.html',
  styleUrl: './right-pane.component.css',
})
export class RightPaneComponent {
  formElements: FormElement[] = [];
  categories: string[] = [];

  constructor(private formElementService: FormElementService) {}

  ngOnInit() {
    this.formElementService.formElements$.subscribe(elements => {
      this.formElements = elements;
      this.categories = [...new Set(elements.map(e => e.category))];
    });
  }

  searchElements(query: string) {
    this.formElements = this.formElementService.searchFormElements(query);
  }

  /** ✅ Handle Drag Start */
  onDragStart(event: DragEvent, field: FormElement): void {
    console.log('🔥 RightPane: Dragging started:', field);
    event.dataTransfer?.setData('text/plain', JSON.stringify(field)); // Store dragged field data
  }
}
