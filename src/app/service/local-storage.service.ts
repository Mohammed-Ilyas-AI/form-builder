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
    this.loadDataFromJSON();
  }

  /** ======== Load Data from JSON Files ======== **/

  private async loadDataFromJSON() {
    // Load form elements from a JSON file (or API if needed)
    const formElementsJSON = await fetch(
      'assets/data/form-elements.json'
    ).then((res) => res.json());
    this.formElements = formElementsJSON;

    // Load field properties from a JSON file
    const fieldPropertiesJSON = await fetch(
      '/assets/data/field-properties.json'
    ).then((res) => res.json());
    this.fieldProperties = fieldPropertiesJSON;

    // Load default field groups
    this.fieldGroups = [
      {
        id: 1,
        name: 'AMC Reports',
        description: 'Report details',
        elements: [],
      },
      {
        id: 2,
        name: 'HVAC Repair',
        description: 'HVAC service details',
        elements: [],
      },
      {
        id: 3,
        name: 'AMC Yearly',
        description: 'Yearly maintenance',
        elements: [],
      },
      {
        id: 4,
        name: 'AMC Installations - Tier 3',
        description: 'Installation details',
        elements: [],
      },
    ];
  }

  /** ======== Field Groups Management ======== **/

  getFieldGroups() {
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

  /** ======== Form Elements Management ======== **/

  getFormElements() {
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
      group.elements = group.elements.filter((e: { id: any; }) => e.id !== elementId);
    }
  }

  updateElementInFieldGroup(fieldGroupId: number, updatedElement: any) {
    const group = this.fieldGroups.find((fg) => fg.id === fieldGroupId);
    if (group) {
      const index = group.elements.findIndex((e: { id: any; }) => e.id === updatedElement.id);
      if (index !== -1) {
        group.elements[index] = updatedElement;
      }
    }
  }

  copyElementInFieldGroup(fieldGroupId: number, elementId: string) {
    const group = this.fieldGroups.find((fg) => fg.id === fieldGroupId);
    if (group) {
      const element = group.elements.find((e: { id: string; }) => e.id === elementId);
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

  getFieldProperties() {
    return this.fieldProperties;
  }
}
