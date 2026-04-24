# Quick Start Guide

Get started with Ivory Presentable in minutes!

## Installation

```bash
npm install ivoryui-presentable
```

## Basic Usage

### 1. Import the Component

```typescript
import { Component } from '@angular/core';
import { IvoryPresentableComponent } from 'ivoryui-presentable';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IvoryPresentableComponent],
  template: `
    <ivory-presentable
      [gridDefs]="gridConfig"
      [columnDefs]="columns"
      [records]="data"
    ></ivory-presentable>
  `
})
export class AppComponent {
  // Configuration here
}
```

### 2. Define Grid Configuration

```typescript
gridConfig = {
  height: 600,
  dataStream: 'client-side'
};
```

### 3. Define Columns

```typescript
columns = [
  { field: 'id', title: 'ID', width: 80 },
  { field: 'name', title: 'Name', width: 150 },
  { field: 'email', title: 'Email', width: 200 },
  { field: 'status', title: 'Status', width: 100 }
];
```

### 4. Provide Data

```typescript
data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
];
```

## Adding Features

### Enable Pagination

```typescript
<ivory-presentable
  [gridDefs]="gridConfig"
  [columnDefs]="columns"
  [records]="data"
  [pagination]="true"
  [recordsPerPage]="20"
  [recordsPerPageOptions]="[20, 50, 100]"
></ivory-presentable>
```

### Enable Row Selection

```typescript
<ivory-presentable
  [gridDefs]="gridConfig"
  [columnDefs]="columns"
  [records]="data"
  [recordSelection]="true"
  (recordsSelected)="onRecordsSelected($event)"
></ivory-presentable>
```

```typescript
onRecordsSelected(records: any[]) {
  console.log('Selected:', records);
}
```

### Enable Sorting & Filtering

```typescript
columns = [
  { 
    field: 'name', 
    title: 'Name',
    sortable: true,
    hasFilter: true,
    filterType: 'text'
  },
  { 
    field: 'status', 
    title: 'Status',
    hasFilter: true,
    filterType: 'options',
    filterOptions: ['Active', 'Inactive']
  }
];
```

### Pin Columns

```typescript
columns = [
  { field: 'id', title: 'ID', pinned: 'left' },
  { field: 'name', title: 'Name', pinned: 'left' },
  { field: 'email', title: 'Email' },
  { field: 'actions', title: 'Actions', pinned: 'right' }
];
```

### Enable Cell Editing

```typescript
<ivory-presentable
  [gridDefs]="gridConfig"
  [columnDefs]="columns"
  [records]="data"
  [cellEditing]="true"
  (cellEdit)="onCellEdit($event)"
></ivory-presentable>
```

```typescript
columns = [
  { 
    field: 'name', 
    title: 'Name',
    editable: true,
    editor: { type: 'text' }
  },
  { 
    field: 'age', 
    title: 'Age',
    editable: true,
    editor: { type: 'number', min: 0, max: 120 }
  }
];

onCellEdit(event: any) {
  console.log('Edited:', event);
}
```

## Next Steps

- [API Documentation](../api/API_REFERENCE.md)
- [Column Pinning Guide](../features/COLUMN_PINNING.md)
- [Keyboard Navigation](../features/KEYBOARD_NAVIGATION.md)
- [Theming Guide](../customization/THEMING.md)

## Complete Example

See [Complete Example](./COMPLETE_EXAMPLE.md) for a full working implementation.
