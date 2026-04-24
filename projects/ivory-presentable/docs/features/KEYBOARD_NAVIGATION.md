# Keyboard Navigation Guide

Ivory Presentable includes comprehensive keyboard navigation support, allowing users to navigate and interact with the grid without using a mouse.

## Navigation Keys

| Key | Action |
|-----|--------|
| `Arrow Up` | Move focus to the cell above |
| `Arrow Down` | Move focus to the cell below |
| `Arrow Left` | Move focus to the cell on the left |
| `Arrow Right` | Move focus to the cell on the right |
| `Home` | Move focus to the first cell in the current row |
| `End` | Move focus to the last cell in the current row |
| `Ctrl + Home` | Move focus to the first cell in the grid |
| `Ctrl + End` | Move focus to the last cell in the grid |
| `Page Up` | Move focus up by one page |
| `Page Down` | Move focus down by one page |
| `Tab` | Move to the next focusable element |
| `Shift + Tab` | Move to the previous focusable element |

## Editing Keys

| Key | Action |
|-----|--------|
| `Double Click` or `Enter` | Start editing the focused cell (if editable) |
| `Enter` | Save changes and exit edit mode |
| `Escape` | Cancel changes and exit edit mode |

## Accessibility Features

- All cells are focusable with `tabindex="0"`
- Focus indicators are clearly visible
- ARIA roles and attributes for screen readers
- Keyboard navigation works seamlessly with pinned columns

## Customizing Focus Styles


You can customize the focus outline using CSS variables:

```css
:root {
  --ivpt-focus-outline: 3px solid #FF5722;
  --ivpt-focus-outline-offset: -3px;
}
```

## Disabling Keyboard Navigation

Keyboard navigation is enabled by default. If you need to disable it programmatically, you can access the component instance and set `keyboardNavigationEnabled = false`.

## Best Practices

1. Ensure your grid has a reasonable height to avoid excessive scrolling
2. Use pinned columns for important data that should always be visible
3. Test keyboard navigation with screen readers for accessibility compliance
4. Provide visual feedback for focused cells
