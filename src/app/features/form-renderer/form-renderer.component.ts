import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: string[];
  icon?: string;
}

@Component({
  selector: 'app-form-renderer',
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './form-renderer.component.html',
  styleUrl: './form-renderer.component.css',
})
export class FormRendererComponent {
  elements: FormElement[] = [];
  loading = false;

  /** ✅ Allow Drop */
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default to allow drop
  }

  /** ✅ Handle Drop Event */
  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');

    if (data) {
      const droppedElement: FormElement = JSON.parse(data);
      console.log('✅ FormRenderer: Received Element Data:', droppedElement);

      this.loading = true;
      setTimeout(() => {
        this.elements.push(droppedElement); // Add dropped element to form
        console.log('✅ FormRenderer: Form field added:', droppedElement);
        this.loading = false;
      }, 1000);
    }
  }

  /** ✅ Dynamically Generate Form Fields */
  createFormField(element: FormElement): string {
    switch (element.type) {
      case 'text':
        return `<div class="mb-2">
                  <label class="block text-sm font-medium text-gray-700">${element.label}</label>
                  <input type="text" class="border p-2 w-full" placeholder="${element.placeholder || ''}">
                </div>`;
      case 'textarea':
        return `<div class="mb-2">
                  <label class="block text-sm font-medium text-gray-700">${element.label}</label>
                  <textarea class="border p-2 w-full" placeholder="${element.placeholder || ''}"></textarea>
                </div>`;
      case 'number':
        return `<div class="mb-2">
                  <label class="block text-sm font-medium text-gray-700">${element.label}</label>
                  <input type="number" class="border p-2 w-full">
                </div>`;
      case 'dropdown':
        return `<div class="mb-2">
                  <label class="block text-sm font-medium text-gray-700">${element.label}</label>
                  <select class="border p-2 w-full">
                    ${element.options?.map(option => `<option>${option}</option>`).join('')}
                  </select>
                </div>`;
      case 'upload':
        return `<div class="mb-2">
                  <label class="block text-sm font-medium text-gray-700">${element.label}</label>
                  <input type="file" class="border p-2 w-full">
                </div>`;
      default:
        return `<p class="text-red-500">Unsupported field type: ${element.type}</p>`;
    }
  }
}
