# API Documentation

## Component: IvoryPresentableComponent

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `gridDefs` | `object` | - | Grid configuration (height, dataStream, recordsTotal) |
| `columnDefs` | `PresentableColumn[]` | - | Column definitions |
| `records` | `any[]` | - | Data records to display |
| `pagination` | `boolean` | `false` | Enable/disable pagination |
| `recordsPerPage` | `number` | `0` | Number of records per page |
| `recordsPerPageOptions` | `number[]` | - | Options for records per page dropdown |
| `recordSelection` | `boolean` | `false` | Enable/disable row selection |
| `cellEditing` | `boolean` | `false` | Enable/disable cell editing |
| `columnControls` | `boolean` | `false` | Show/hide column visibility controls |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `dataparams` | `EventEmitter<any>` | Emits data parameters for server-side operations |
| `recordsSelected` | `EventEmitter<any[]>` | Emits selected rows |
| `cellEdit` | `EventEmitter<CellEditEvent>` | Emits cell edit events |

### Grid Configuration (gridDefs)

```typescript
gridDefs = {
  height: 600,                    // Grid height in pixels
  dataStream: 'client-side',      // 'client-side' or 'server-side'
  recordsTotal: null              // Total records (for server-side)
};
```

## Interface: PresentableColumn

```typescript
interface PresentableColumn {
  title?: string;              // Column header text
  field?: string;              // Data field name
  alignment?: string;          // Text alignment
  sortable?: boolean;          // Enable sorting
  resizable?: boolean;         // Enable column resizing
  hasFilter?: boolean;         // Show filter
  filterOptions?: any[];       // Options for dropdown filter
  width?: number | string;     // Column width
  minWidth?: number | string;  // Minimum width
  maxWidth?: number | string;  // Maximum width
  editable?: boolean;          // Enable cell editing
  editor?: CellEditorConfig;   // Editor configuration
  pinned?: 'left' | 'right' | null;  // Pin column position
  visible?: boolean;           // Column visibility
}
```


## Interface: CellEditorConfig

```typescript
interface CellEditorConfig {
  type: 'text' | 'number' | 'date' | 'select';
  min?: number;           // For number type
  max?: number;           // For number type
  options?: string[];     // For select type
}
```

## Interface: CellEditEvent

```typescript
interface CellEditEvent {
  rowData: any;          // The entire row data
  field: string;         // Field that was edited
  oldValue: any;         // Previous value
  newValue: any;         // New value
  rowIndex: number;      // Row index
}
```

## Example Usage

### Basic Setup

```typescript
import { Component } from '@angular/core';
import { IvoryPresentableComponent, PresentableColumn } from 'ivoryui-presentable';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [IvoryPresentableComponent],
  template: `
    <ivory-presentable
      [gridDefs]="gridConfig"
      [columnDefs]="columns"
      [records]="data"
      [pagination]="true"
      [recordsPerPage]="20"
      [recordsPerPageOptions]="[20, 50, 100]"
      [recordSelection]="true"
      [cellEditing]="true"
      [columnControls]="true"
      (dataparams)="onDataParamsChange($event)"
      (recordsSelected)="onRecordsSelected($event)"
      (cellEdit)="onCellEdit($event)"
    ></ivory-presentable>
  `
})
export class DataGridComponent {
  gridConfig = {
    height: 600,
    dataStream: 'client-side'
  };

  columns: PresentableColumn[] = [
    { 
      field: 'id', 
      title: 'ID', 
      pinned: 'left',
      width: 80,
      sortable: true
    },
    { 
      field: 'name', 
      title: 'Name',
      pinned: 'left',
      width: 150,
      hasFilter: true,
      filterType: 'text',
      editable: true,
      editor: { type: 'text' }
    },
    { 
      field: 'age', 
      title: 'Age',
      width: 100,
      editable: true,
      editor: { type: 'number', min: 0, max: 120 }
    },
    { 
      field: 'status', 
      title: 'Status',
      width: 120,
      hasFilter: true,
      filterType: 'options',
      filterOptions: ['Active', 'Inactive'],
      editable: true,
      editor: { 
        type: 'select', 
        options: ['Active', 'Inactive'] 
      }
    }
  ];

  data = [
    { id: 1, name: 'John Doe', age: 30, status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 25, status: 'Inactive' }
  ];

  onDataParamsChange(params: any) {
    console.log('Data params:', params);
    // Handle server-side operations
  }

  onRecordsSelected(records: any[]) {
    console.log('Selected records:', records);
  }

  onCellEdit(event: CellEditEvent) {
    console.log('Cell edited:', event);
    // Update your data source
  }
}
```

### Server-Side Data

```typescript
gridConfig = {
  height: 600,
  dataStream: 'server-side',
  recordsTotal: 1000  // Total records on server
};

onDataParamsChange(params: any) {
  // params contains: filterConfig, sortBy, orderBy, recordsFrom, recordsTo
  this.fetchDataFromServer(params).subscribe(data => {
    this.data = data;
  });
}
```

## Keyboard Navigation

The grid automatically supports keyboard navigation:
- Arrow keys for cell navigation
- Home/End for row navigation
- Ctrl+Home/End for grid navigation
- Page Up/Down for page scrolling
- Enter to edit, Escape to cancel

See [KEYBOARD_NAVIGATION.md](./KEYBOARD_NAVIGATION.md) for details.

## Theming

Customize appearance using CSS variables:

```css
:root {
  --ivpt-background-standard: #F5F5F5;
  --ivpt-text-color: #333333;
  --ivpt-focus-outline: 2px solid #007BFF;
}
```

See [THEMING.md](./THEMING.md) for all available variables.
