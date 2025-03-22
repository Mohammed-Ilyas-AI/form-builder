import { Component } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
  formElements: any[] = [];

  constructor(private storageService: LocalStorageService) {}

  async ngOnInit() {
    this.formElements = await this.storageService.getFormElements();
    console.log('✅ RightPane: Loaded available form elements:', this.formElements);
  }

  /** ✅ Handle Drag Start */
  onDragStart(event: DragEvent, field: FormElement): void {
    console.log('🔥 RightPane: Dragging started:', field);
    event.dataTransfer?.setData('text/plain', JSON.stringify(field)); // Store dragged field data
  }
}
