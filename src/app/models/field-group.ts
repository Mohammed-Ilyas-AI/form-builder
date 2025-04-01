export interface FieldGroup {
  id: number;
  name: string;
  description?: string;
  elements: any[]; // List of form elements inside the field group
  type: 'default' | 'created' | 'copied'; // Determines the category of the field group
}
