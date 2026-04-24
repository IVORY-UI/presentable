# Column Configuration

Complete reference for configuring columns in Ivory Presentable.

## PresentableColumn Interface

```typescript
interface PresentableColumn {
  // Basic Properties
  field?: string;              // Data field name (required for data binding)
  title?: string;              // Column header text
  visible?: boolean;           // Column visibility (default: true)
  
  // Sizing
  width?: number | string;     // Column width (px or string)
  minWidth?: number | string;  // Minimum width
  maxWidth?: number | string;  // Maximum width
  resizable?: boolean;         // Enable column resizing
  
  // Alignment
  alignment?: string;          // Text alignment: 'left' | 'center' | 'right'
  
  // Sorting
  sortable?: boolean;          // Enable sorting for this column
  
  // Filtering
  hasFilter?: boolean;         // Show filter for this column
  filterType?: string;         // 'text' | 'options'
  filterOptions?: any[];       // Options for dropdown filter
  
  // Editing
  editable?: boolean;          // Enable cell editing
  editor?: CellEditorConfig;   // Editor configuration
  
  // Pinning
  pinned?: 'left' | 'right' | null;  // Pin column position
}
```

## Property Details

### field
- **Type**: `string`
- **Required**: Yes (for data binding)
- **Description**: The property name in your data object

```typescript
{ field: 'username', title: 'Username' }
// Binds to: data.username
```

### title
- **Type**: `string`
- **Description**: Text displayed in column header

```typescript
{ field: 'firstName', title: 'First Name' }
```

### visible
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls column visibility

```typescript
{ field: 'id', title: 'ID', visible: false }
```

### width
- **Type**: `number | string`
- **Description**: Column width in pixels or CSS string

```typescript
{ field: 'name', width: 150 }
{ field: 'description', width: '25%' }
```

### resizable
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Allow users to resize column

```typescript
{ field: 'name', resizable: true }
```

### sortable
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable sorting on column header click

```typescript
{ field: 'age', sortable: true }
```

### hasFilter
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Show filter UI for this column

```typescript
{ field: 'name', hasFilter: true, filterType: 'text' }
```

### filterType
- **Type**: `'text' | 'options'`
- **Description**: Type of filter to display

```typescript
// Text filter
{ field: 'name', hasFilter: true, filterType: 'text' }

// Options filter
{ 
  field: 'status', 
  hasFilter: true, 
  filterType: 'options',
  filterOptions: ['Active', 'Inactive']
}
```

### editable
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable inline editing for this column

```typescript
{ field: 'name', editable: true, editor: { type: 'text' } }
```

### editor
- **Type**: `CellEditorConfig`
- **Description**: Configuration for cell editor

```typescript
// Text editor
{ editor: { type: 'text' } }

// Number editor with range
{ editor: { type: 'number', min: 0, max: 100 } }

// Date editor
{ editor: { type: 'date' } }

// Select editor
{ editor: { type: 'select', options: ['Option 1', 'Option 2'] } }
```

### pinned
- **Type**: `'left' | 'right' | null`
- **Default**: `null`
- **Description**: Pin column to left or right side

```typescript
{ field: 'id', pinned: 'left' }
{ field: 'actions', pinned: 'right' }
```

## Common Patterns

### Read-Only Column
```typescript
{
  field: 'id',
  title: 'ID',
  width: 80,
  sortable: true,
  editable: false
}
```

### Editable Text Column
```typescript
{
  field: 'name',
  title: 'Name',
  width: 150,
  hasFilter: true,
  filterType: 'text',
  editable: true,
  editor: { type: 'text' }
}
```

### Dropdown Column
```typescript
{
  field: 'status',
  title: 'Status',
  width: 120,
  hasFilter: true,
  filterType: 'options',
  filterOptions: ['Active', 'Inactive', 'Pending'],
  editable: true,
  editor: {
    type: 'select',
    options: ['Active', 'Inactive', 'Pending']
  }
}
```

### Pinned ID Column
```typescript
{
  field: 'id',
  title: 'ID',
  width: 60,
  pinned: 'left',
  sortable: true,
  resizable: false
}
```

### Action Column
```typescript
{
  field: 'actions',
  title: 'Actions',
  width: 100,
  pinned: 'right',
  sortable: false,
  resizable: false
}
```

## Complete Example

```typescript
columns: PresentableColumn[] = [
  {
    field: 'id',
    title: 'ID',
    width: 60,
    pinned: 'left',
    sortable: true,
    resizable: false
  },
  {
    field: 'username',
    title: 'Username',
    width: 120,
    pinned: 'left',
    hasFilter: true,
    filterType: 'text',
    editable: true,
    editor: { type: 'text' }
  },
  {
    field: 'email',
    title: 'Email',
    width: 200,
    hasFilter: true,
    filterType: 'text',
    editable: true,
    editor: { type: 'text' }
  },
  {
    field: 'age',
    title: 'Age',
    width: 80,
    sortable: true,
    editable: true,
    editor: { type: 'number', min: 18, max: 100 }
  },
  {
    field: 'role',
    title: 'Role',
    width: 120,
    hasFilter: true,
    filterType: 'options',
    filterOptions: ['Admin', 'User', 'Guest'],
    editable: true,
    editor: {
      type: 'select',
      options: ['Admin', 'User', 'Guest']
    }
  },
  {
    field: 'status',
    title: 'Status',
    width: 100,
    pinned: 'right'
  }
];
```

## See Also

- [API Reference](./API_REFERENCE.md)
- [Column Pinning](../features/COLUMN_PINNING.md)
- [Cell Editing](../features/CELL_EDITING.md)
