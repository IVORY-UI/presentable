# Column Pinning/Freezing

Column pinning allows you to lock columns to the left or right side of the grid, keeping them visible while scrolling horizontally through other columns.

## Usage

Add the `pinned` property to your column definition:

```typescript
import { PresentableColumn } from 'ivoryui-presentable';

columnDefs: PresentableColumn[] = [
  { 
    field: 'id', 
    title: 'ID', 
    pinned: 'left',
    width: 80
  },
  { 
    field: 'name', 
    title: 'Name', 
    pinned: 'left',
    width: 150
  },
  { 
    field: 'email', 
    title: 'Email',
    width: 200
  },
  { 
    field: 'phone', 
    title: 'Phone',
    width: 150
  },
  { 
    field: 'actions', 
    title: 'Actions', 
    pinned: 'right',
    width: 120
  }
];
```

## Pinning Options

- `pinned: 'left'` - Pins the column to the left side
- `pinned: 'right'` - Pins the column to the right side
- `pinned: null` or omit - Column scrolls normally (default)

## Features

- Pinned columns remain visible during horizontal scrolling
- Visual shadow effect to distinguish pinned columns
- Works seamlessly with all other grid features:
  - Sorting
  - Filtering
  - Resizing
  - Cell editing
  - Row selection
  - Keyboard navigation

## Best Practices

1. Pin important identifier columns (ID, Name) to the left
2. Pin action columns (Edit, Delete buttons) to the right
3. Limit the number of pinned columns to maintain usability
4. Ensure pinned columns have appropriate widths
5. Test on different screen sizes

## Styling Pinned Columns

Pinned columns have a subtle shadow by default. Customize it:

```css
:root {
  --ivpt-pinned-shadow: 4px 0 8px rgba(0, 0, 0, 0.15);
}
```

## Example

```typescript
@Component({
  selector: 'app-users-grid',
  template: `
    <ivory-presentable
      [columnDefs]="columns"
      [records]="users"
      [gridDefs]="gridConfig"
    ></ivory-presentable>
  `
})
export class UsersGridComponent {
  columns = [
    { field: 'id', title: 'ID', pinned: 'left', width: 60 },
    { field: 'username', title: 'Username', pinned: 'left', width: 120 },
    { field: 'email', title: 'Email', width: 200 },
    { field: 'department', title: 'Department', width: 150 },
    { field: 'role', title: 'Role', width: 120 },
    { field: 'status', title: 'Status', width: 100 },
    { field: 'actions', title: '', pinned: 'right', width: 100 }
  ];
  
  users = [...]; // your data
  
  gridConfig = {
    height: 600,
    dataStream: 'client-side'
  };
}
```
