import { CellEditorConfig } from './cell-editor.interface';

export interface PresentableColumn {
  title?: string;
  field?: string;
  alignment?: string;
  sortable?: boolean;
  resizable?: boolean;
  hasFilter?: boolean;
  filterOptions?: any[];
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  editable?: boolean;
  editor?: CellEditorConfig;
  pinned?: 'left' | 'right' | null;
}
