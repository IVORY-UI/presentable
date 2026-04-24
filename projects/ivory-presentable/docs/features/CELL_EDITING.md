# Cell Editing

Ivory Presentable supports inline cell editing with multiple editor types.

## Enabling Cell Editing

### 1. Enable at Grid Level

```typescript
<ivory-presentable
  [gridDefs]="gridConfig"
  [columnDefs]="columns"
  [records]="data"
  [cellEditing]="true"
  (cellEdit)="onCellEdit($event)"
></ivory-presentable>
```

### 2. Configure Editable Columns

```typescript
columns = [
  {
    field: 'name',
    title: 'Name',
    editable: true,
    editor: { type: 'text' }
  }
];
```

## Editor Types

### Text Editor

```typescript
{
  field: 'name',
  title: 'Name',
  editable: true,
  editor: { type: 'text' }
}
```

### Number Editor

```typescript
{
  field: 'age',
  title: 'Age',
  editable: true,
  editor: {
    type: 'number',
    min: 0,
    max: 120
  }
}
```

### Date Editor

```typescript
{
  field: 'birthDate',
  title: 'Birth Date',
  editable: true,
  editor: { type: 'date' }
}
```

### Select Editor

```typescript
{
  field: 'status',
  title: 'Status',
  editable: true,
  editor: {
    type: 'select',
    options: ['Active', 'Inactive', 'Pending']
  }
}
```

## Edit Events

### CellEditEvent Interface

```typescript
interface CellEditEvent {
  rowData: any;          // Complete row data
  field: string;         // Field that was edited
  oldValue: any;         // Previous value
  newValue: any;         // New value
  rowIndex: number;      // Row index
}
```

### Handling Edit Events

```typescript
onCellEdit(event: CellEditEvent) {
  console.log(`Row ${event.rowIndex}: ${event.field} changed`);
  console.log(`From: ${event.oldValue} To: ${event.newValue}`);
  
  // Update your data source
  this.updateRecord(event.rowData);
  
  // Or send to server
  this.http.put(`/api/records/${event.rowData.id}`, event.rowData)
    .subscribe(response => {
      console.log('Updated successfully');
    });
}
```

## User Interaction

### Starting Edit Mode
- **Double-click** on an editable cell
- Cell shows edit indicator (✎) on hover

### Saving Changes
- Press **Enter** to save
- Click outside the cell to save
- Changes are committed immediately

### Canceling Changes
- Press **Escape** to cancel
- Original value is restored

## Validation

### Client-Side Validation

```typescript
onCellEdit(event: CellEditEvent) {
  // Validate email
  if (event.field === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.newValue)) {
      alert('Invalid email format');
      // Revert to old value
      event.rowData[event.field] = event.oldValue;
      return;
    }
  }
  
  // Validate age range
  if (event.field === 'age') {
    if (event.newValue < 18 || event.newValue > 100) {
      alert('Age must be between 18 and 100');
      event.rowData[event.field] = event.oldValue;
      return;
    }
  }
  
  // Save if valid
  this.saveChanges(event.rowData);
}
```

### Server-Side Validation

```typescript
onCellEdit(event: CellEditEvent) {
  this.http.put(`/api/records/${event.rowData.id}`, event.rowData)
    .subscribe(
      response => {
        console.log('Saved successfully');
      },
      error => {
        alert('Validation failed: ' + error.message);
        // Revert to old value
        event.rowData[event.field] = event.oldValue;
      }
    );
}
```

## Complete Example

```typescript
@Component({
  selector: 'app-editable-grid',
  template: `
    <ivory-presentable
      [gridDefs]="gridConfig"
      [columnDefs]="columns"
      [records]="users"
      [cellEditing]="true"
      (cellEdit)="onCellEdit($event)"
    ></ivory-presentable>
  `
})
export class EditableGridComponent {
  gridConfig = {
    height: 600,
    dataStream: 'client-side'
  };

  columns = [
    {
      field: 'id',
      title: 'ID',
      width: 60,
      editable: false
    },
    {
      field: 'name',
      title: 'Name',
      width: 150,
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
      field: 'age',
      title: 'Age',
      width: 80,
      editable: true,
      editor: { type: 'number', min: 18, max: 100 }
    },
    {
      field: 'role',
      title: 'Role',
      width: 120,
      editable: true,
      editor: {
        type: 'select',
        options: ['Admin', 'User', 'Guest']
      }
    },
    {
      field: 'startDate',
      title: 'Start Date',
      width: 120,
      editable: true,
      editor: { type: 'date' }
    }
  ];

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, role: 'Admin', startDate: '2020-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, role: 'User', startDate: '2021-03-20' }
  ];

  onCellEdit(event: CellEditEvent) {
    console.log('Cell edited:', event);
    
    // Validate
    if (!this.validate(event)) {
      event.rowData[event.field] = event.oldValue;
      return;
    }
    
    // Save to server
    this.saveToServer(event.rowData);
  }

  validate(event: CellEditEvent): boolean {
    if (event.field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(event.newValue)) {
        alert('Invalid email format');
        return false;
      }
    }
    return true;
  }

  saveToServer(record: any) {
    // Implement your save logic
    console.log('Saving:', record);
  }
}
```

## Styling

### Custom Edit Indicator

```css
.ivpt-cell-editable::after {
  content: '✏️';
  font-size: 12px;
}
```

### Edit Mode Styling

```css
.ivpt-cell-editing {
  background-color: #fffacd !important;
  outline: 2px solid #ffa500 !important;
}
```

## Best Practices

1. **Always validate input** before saving
2. **Provide visual feedback** during save operations
3. **Handle errors gracefully** and revert on failure
4. **Use appropriate editor types** for data types
5. **Consider accessibility** - keyboard navigation works automatically

## See Also

- [Column Configuration](../api/COLUMN_CONFIGURATION.md)
- [Keyboard Navigation](./KEYBOARD_NAVIGATION.md)
- [API Reference](../api/API_REFERENCE.md)
