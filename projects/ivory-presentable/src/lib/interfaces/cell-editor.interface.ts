export type CellEditorType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'custom';

export interface CellEditorConfig {
  type: CellEditorType;
  options?: any[]; // For select editor
  min?: number; // For number editor
  max?: number; // For number editor
  step?: number; // For number editor
  customComponent?: any; // For custom editor
}

export interface CellEditEvent {
  rowData: any;
  field: string;
  oldValue: any;
  newValue: any;
  rowIndex: number;
}
