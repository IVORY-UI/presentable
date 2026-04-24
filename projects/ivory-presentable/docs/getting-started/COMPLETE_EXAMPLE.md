# Complete Example

A full-featured example demonstrating all major capabilities of Ivory Presentable.

```typescript
import { Component } from '@angular/core';
import { IvoryPresentableComponent } from 'ivoryui-presentable';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [IvoryPresentableComponent],
  template: `
    <ivory-presentable
      [gridDefs]="gridConfig"
      [columnDefs]="columns"
      [records]="users"
      [pagination]="true"
      [recordsPerPage]="20"
      [recordsPerPageOptions]="[20, 50, 100]"
      [recordSelection]="true"
      [cellEditing]="true"
      [columnControls]="true"
      (recordsSelected)="onSelect($event)"
      (cellEdit)="onEdit($event)"
    ></ivory-presentable>
  `
})
export class UsersComponent {
  gridConfig = {
    height: 600,
    dataStream: 'client-side'
  };

  columns = [
    { 
      field: 'id', 
      title: 'ID', 
      pinned: 'left',
      width: 60
    },
    { 
      field: 'username', 
      title: 'Username',
      pinned: 'left',
      width: 120,
      hasFilter: true,
      filterType: 'text',
      editable: true,
      editor: { type: 'text' }
    },
    { 
      field: 'email', 
      title: 'Email',
      width: 200,
      editable: true,
      editor: { type: 'text' }
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
      pinned: 'right',
      width: 100
    }
  ];

  users = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, username: 'bob_wilson', email: 'bob@example.com', role: 'Guest', status: 'Inactive' }
  ];

  onSelect(records: any[]) {
    console.log('Selected users:', records);
  }

  onEdit(event: any) {
    console.log('User edited:', event);
    // Update your backend here
  }
}
```

## Features Demonstrated

1. **Column Pinning**: ID and Username pinned left, Status pinned right
2. **Pagination**: 20 records per page with options
3. **Row Selection**: Multi-select with checkbox
4. **Cell Editing**: Text, select editors
5. **Filtering**: Text and options filters
6. **Column Controls**: Show/hide columns
7. **Keyboard Navigation**: Automatic support

## Customizing the Theme

Add to your `styles.scss`:

```css
:root {
  --ivpt-background-standard: #F5F5F5;
  --ivpt-text-color: #333333;
  --ivpt-focus-outline: 2px solid #007BFF;
}
```
