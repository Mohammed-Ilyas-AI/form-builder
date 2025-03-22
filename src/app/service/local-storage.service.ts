import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private fieldGroups: any[] = [];
  private formElements: any[] = [];
  private fieldProperties: any[] = [];
  private selectedFieldGroup: any = null;

  constructor() {
    this.loadDefaults();
  }

  /** ======== Load Default Data ======== **/
  private async loadDefaults() {
    try {
      // Load form elements from JSON
      const formElementsResponse = await fetch('/assets/data/form-elements.json');
      if (!formElementsResponse.ok) throw new Error(`Failed to load form-elements.json`);
      this.formElements = await formElementsResponse.json();

      // Load field properties from JSON
      const fieldPropertiesResponse = await fetch('/assets/data/field-properties.json');
      if (!fieldPropertiesResponse.ok) throw new Error(`Failed to load field-properties.json`);
      this.fieldProperties = await fieldPropertiesResponse.json();

      console.log('Form Elements Loaded:', this.formElements);
      console.log('Field Properties Loaded:', this.fieldProperties);
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }

    // Load default field groups
    this.fieldGroups = [
      { id: 1, name: 'AMC Reports', description: 'Report details', elements: [] },
      { id: 2, name: 'HVAC Repair', description: 'HVAC service details', elements: [] },
      { id: 3, name: 'AMC Yearly', description: 'Yearly maintenance', elements: [] },
      { id: 4, name: 'AMC Installations - Tier 3', description: 'Installation details', elements: [] }
    ];

    // Set first field group as default selected
    this.selectedFieldGroup = this.fieldGroups.length > 0 ? this.fieldGroups[0] : null;

    console.log('Field Groups Loaded:', this.fieldGroups);
  }

  /** ======== Field Groups Management ======== **/
  async getFieldGroups(): Promise<any[]> {
    while (this.fieldGroups.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait until data is available
    }
    return this.fieldGroups;
  }

  createFieldGroup(name: string, description: string) {
    const newGroup = { id: Date.now(), name, description, elements: [] };
    this.fieldGroups.push(newGroup);
    return newGroup;
  }

  setSelectedFieldGroup(group: any) {
    this.selectedFieldGroup = group;
  }

  getSelectedFieldGroup() {
    return this.selectedFieldGroup;
  }

  reorderFieldGroups(previousIndex: number, currentIndex: number) {
    const movedItem = this.fieldGroups.splice(previousIndex, 1)[0];
    this.fieldGroups.splice(currentIndex, 0, movedItem);
  }

  /** ✅ Copy Field Group (Fix: Properly Duplicate Field Group & Update Left Pane) **/
  copyFieldGroup(originalGroupId: number) {
    const originalGroup = this.fieldGroups.find(group => group.id === originalGroupId);
    if (originalGroup) {
      const copiedGroup = {
        ...originalGroup,
        id: Date.now(), // Generate new ID
        name: originalGroup.name + ' - Copy'
      };
      this.fieldGroups.push(copiedGroup);
    }
  }

  /** ✅ Delete Field Group (Fix: Remove Form & Update Selection) **/
  deleteFieldGroup(groupId: number) {
    this.fieldGroups = this.fieldGroups.filter(group => group.id !== groupId);

    // If the deleted group was selected, reset selection
    if (this.selectedFieldGroup?.id === groupId) {
      this.selectedFieldGroup = this.fieldGroups.length > 0 ? this.fieldGroups[0] : null;
    }
  }

  /** ======== Form Elements Management ======== **/
  async getFormElements(): Promise<any[]> {
    while (this.formElements.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return this.formElements;
  }

  addElementToFieldGroup(fieldGroupId: number, element: any) {
    const group = this.fieldGroups.find((fg) => fg.id === fieldGroupId);
    if (group) {
      group.elements.push(element);
    }
  }

  removeElementFromFieldGroup(fieldGroupId: number, elementId: string) {
    const group = this.fieldGroups.find((fg) => fg.id === fieldGroupId);
    if (group) {
      group.elements = group.elements.filter((e: { id: any }) => e.id !== elementId);
    }
  }

  updateElementInFieldGroup(fieldGroupId: number, updatedElement: any) {
    const group = this.fieldGroups.find((fg) => fg.id === fieldGroupId);
    if (group) {
      const index = group.elements.findIndex((e: { id: any }) => e.id === updatedElement.id);
      if (index !== -1) {
        group.elements[index] = updatedElement;
      }
    }
  }

  copyElementInFieldGroup(fieldGroupId: number, elementId: string) {
    const group = this.fieldGroups.find((fg) => fg.id === fieldGroupId);
    if (group) {
      const element = group.elements.find((e: { id: string }) => e.id === elementId);
      if (element) {
        const copiedElement = { ...element, id: element.id + '_copy' };
        group.elements.push(copiedElement);
      }
    }
  }

  /** ======== Form JSON Import/Export ======== **/
  saveForm(groupId: number) {
    const group = this.fieldGroups.find((fg) => fg.id === groupId);
    return group ? JSON.stringify(group) : null;
  }

  exportForm(groupId: number) {
    const jsonData = this.saveForm(groupId);
    if (!jsonData) return;

    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form-data.json';
    link.click();
  }

  importForm(jsonData: any) {
    const parsedData = JSON.parse(jsonData);
    this.fieldGroups.push(parsedData);
  }

  previewForm(groupId: number) {
    return this.fieldGroups.find((fg) => fg.id === groupId) || null;
  }

  /** ======== Field Properties Management ======== **/
  async getFieldProperties(): Promise<any[]> {
    while (this.fieldProperties.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return this.fieldProperties;
  }
}
