# Grid Configuration

Complete reference for configuring the Ivory Presentable grid.

## Grid Configuration Object

```typescript
interface GridConfiguration {
  height: number;              // Grid height in pixels
  dataStream: string;          // 'client-side' | 'server-side'
  recordsTotal?: number;       // Total records (for server-side)
  style?: string;              // Reserved for future use
}
```

## Properties

### height
- **Type**: `number`
- **Required**: Yes
- **Description**: Total height of the grid in pixels (includes header, body, footer)

```typescript
gridDefs = {
  height: 600,  // 600px total height
  dataStream: 'client-side'
};
```

**Calculation**:
- Header: ~45px
- Column headers: ~45px
- Filter row: ~45px (if filters enabled)
- Body: Remaining height
- Footer/Pagination: ~45px (if pagination enabled)

### dataStream
- **Type**: `'client-side' | 'server-side'`
- **Required**: Yes
- **Description**: Determines how data operations are handled

#### Client-Side
All data operations (sorting, filtering, pagination) happen in the browser.

```typescript
gridDefs = {
  height: 600,
  dataStream: 'client-side'
};
```

**Use when**:
- Dataset is small to medium (< 10,000 records)
- All data is available upfront
- No server-side processing needed

#### Server-Side
Data operations are delegated to the server.

```typescript
gridDefs = {
  height: 600,
  dataStream: 'server-side',
  recordsTotal: 50000  // Total records on server
};
```

**Use when**:
- Large datasets (> 10,000 records)
- Data needs to be fetched on demand
- Server-side filtering/sorting required

### recordsTotal
- **Type**: `number`
- **Required**: Only for server-side
- **Description**: Total number of records available on the server

```typescript
gridDefs = {
  height: 600,
  dataStream: 'server-side',
  recordsTotal: 1000000  // 1 million records
};
```

## Examples

### Basic Client-Side Grid

```typescript
@Component({
  template: `
    <ivory-presentable
      [gridDefs]="gridConfig"
      [columnDefs]="columns"
      [records]="data"
    ></ivory-presentable>
  `
})
export class MyComponent {
  gridConfig = {
    height: 600,
    dataStream: 'client-side'
  };
  
  columns = [...];
  data = [...];  // All data loaded
}
```

### Server-Side Grid with Pagination

```typescript
@Component({
  template: `
    <ivory-presentable
      [gridDefs]="gridConfig"
      [columnDefs]="columns"
      [records]="data"
      [pagination]="true"
      [recordsPerPage]="50"
      (dataparams)="onDataParamsChange($event)"
    ></ivory-presentable>
  `
})
export class MyComponent {
  gridConfig = {
    height: 600,
    dataStream: 'server-side',
    recordsTotal: 10000  // Total on server
  };
  
  columns = [...];
  data = [];  // Initially empty
  
  onDataParamsChange(params: any) {
    // params: { filterConfig, sortBy, orderBy, recordsFrom, recordsTo }
    this.fetchDataFromServer(params).subscribe(result => {
      this.data = result.data;
      this.gridConfig.recordsTotal = result.total;
    });
  }
}
```

### Responsive Height

```typescript
@Component({
  template: `
    <ivory-presentable
      [gridDefs]="gridConfig"
      [columnDefs]="columns"
      [records]="data"
    ></ivory-presentable>
  `
})
export class MyComponent implements OnInit {
  gridConfig = {
    height: 600,
    dataStream: 'client-side'
  };
  
  ngOnInit() {
    // Adjust height based on viewport
    const viewportHeight = window.innerHeight;
    this.gridConfig.height = viewportHeight - 200;  // Leave space for other UI
  }
}
```

## Height Calculation Guide

### Fixed Height
```typescript
gridConfig = { height: 600, dataStream: 'client-side' };
// Grid will always be 600px tall
```

### Viewport-Based Height
```typescript
ngOnInit() {
  const availableHeight = window.innerHeight - 100;  // Minus header/footer
  this.gridConfig = {
    height: availableHeight,
    dataStream: 'client-side'
  };
}
```

### Container-Based Height
```typescript
@ViewChild('gridContainer') container!: ElementRef;

ngAfterViewInit() {
  const containerHeight = this.container.nativeElement.offsetHeight;
  this.gridConfig = {
    height: containerHeight,
    dataStream: 'client-side'
  };
}
```

## Server-Side Data Parameters

When using `dataStream: 'server-side'`, the grid emits data parameters through the `dataparams` output:

```typescript
interface DataParams {
  filterConfig: {
    [field: string]: {
      type: 'text' | 'options';
      value: any;
    }
  };
  sortBy: string | null;       // Field to sort by
  orderBy: 'ASC' | 'DESC' | null;  // Sort direction
  recordsFrom: number;         // Start index
  recordsTo: number;           // End index
}
```

### Example Server Request

```typescript
onDataParamsChange(params: DataParams) {
  const queryParams = {
    page: Math.floor(params.recordsFrom / this.pageSize),
    pageSize: params.recordsTo - params.recordsFrom,
    sortField: params.sortBy,
    sortOrder: params.orderBy,
    filters: params.filterConfig
  };
  
  this.http.get('/api/data', { params: queryParams })
    .subscribe(response => {
      this.data = response.data;
      this.gridConfig.recordsTotal = response.total;
    });
}
```

## Best Practices

1. **Choose the right data stream**:
   - Use client-side for < 10,000 records
   - Use server-side for larger datasets

2. **Set appropriate height**:
   - Consider viewport size
   - Leave space for other UI elements
   - Test on different screen sizes

3. **Server-side optimization**:
   - Implement efficient server-side filtering
   - Use database indexes for sorting
   - Cache frequently accessed data

4. **Performance**:
   - Don't set height too large (causes rendering issues)
   - Implement virtual scrolling for very large datasets
   - Debounce filter inputs on server-side

## See Also

- [API Reference](./API_REFERENCE.md)
- [Server-Side Data](../advanced/SERVER_SIDE.md)
- [Performance Tips](../advanced/PERFORMANCE.md)
