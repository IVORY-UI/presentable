# Presentable
A lightweight Angular data grid. It has no third-party dependencies and integrated smoothly with your Angular applications.

## Features
Currently the Presentable supports minimal features and the design also a bit basic. But, we are committed to actively developing this library and 
keep pushing more features in phasely manner. In terms of design, the current design implementation is not matured enough. We will keep improvising the 
design as well. 

### List of features:
- Supports both server-side and client-side data
- Pagination
- Sorting
- Filtering
  - Filter by Text
  - Filter by Options
- Row Selection
- Column Resizing
- Column Controls
- Column Pinning/Freezing (Left & Right)
- Keyboard Navigation (Arrow keys, Home, End, Page Up/Down)
- Custom Theming via CSS Variables
- Cell Editing with multiple editor types

## Usage & Demo
Visit the below URL to check the demo and learn more about the usage.
https://ivory-presentable.netlify.app/

### Column Pinning
Pin columns to the left or right side of the grid:
```typescript
columnDefs = [
  { field: 'id', title: 'ID', pinned: 'left' },
  { field: 'name', title: 'Name', pinned: 'left' },
  { field: 'description', title: 'Description' },
  { field: 'actions', title: 'Actions', pinned: 'right' }
];
```

### Keyboard Navigation
Navigate the grid using keyboard shortcuts:
- Arrow keys to move between cells
- Home/End to jump to first/last cell in row
- Ctrl+Home/End to jump to first/last cell in grid
- Page Up/Down to scroll by page
- Enter to edit, Escape to cancel

See [KEYBOARD_NAVIGATION.md](./projects/ivory-presentable/KEYBOARD_NAVIGATION.md) for full details.

### Custom Theming
Customize the grid appearance using CSS variables:
```css
:root {
  --ivpt-background-standard: #your-color;
  --ivpt-text-color: #your-text-color;
  --ivpt-focus-outline: 2px solid #your-accent-color;
}
```

See [THEMING.md](./projects/ivory-presentable/THEMING.md) for all available variables.

## Compatibility & Browser Support
Presentable works with Angular v20 and above. The library has been upgraded to use standalone components and modern Angular features. It works well with the latest versions of all major browsers.

### Angular Version Support
- **Current Version**: Angular v20+
- **Previous Versions**: For Angular v17-v19, use version 0.0.3
- **Migration Guide**: See [ANGULAR_V20_MIGRATION.md](./ANGULAR_V20_MIGRATION.md) for upgrade instructions

## Contribute & Report
Presentable is currently in active development and fine-tuning. If you encounter any issues, please report them here - https://github.com/IVORY-UI/ivory-presentable/issues. If you would like to contribute, kindly submit a pull request here - https://github.com/IVORY-UI/ivory-presentable/pulls. 

## Support
Your support inspires & encourage us more. If you are interested to make a donation to us, please click the below PayPal button.

[![PayPal.me](https://img.shields.io/badge/paypal-donate-119fde.svg)](https://www.paypal.me/LakshmikanthV)

## License
This project is licensed under the MIT license. See the LICENSE file for more info.
