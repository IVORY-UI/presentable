# Theming Guide

Ivory Presentable supports custom theming through CSS custom properties (CSS variables). This allows you to customize the appearance of the grid to match your application's design system.

## Available CSS Variables

You can override any of the following CSS variables in your application's global styles:

```css
:root {
  /* Border colors */
  --ivpt-border-color-standard: #CDD4D9;
  --ivpt-border-color-resize: #C9D7E1;
  
  /* Background colors */
  --ivpt-background-standard: #EEF3F8;
  --ivpt-background-row-hover: #F8FBFD;
  --ivpt-background-row-selected: #E3F2FD;
  
  /* Button colors */
  --ivpt-button-background-standard: #C8DBEE;
  --ivpt-button-background-highlight: #859FB4;
  
  /* Text colors */
  --ivpt-text-color: #212529;
  --ivpt-text-color-secondary: #6C757D;
  
  /* Pinned column shadow */
  --ivpt-pinned-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  
  /* Focus outline for keyboard navigation */
  --ivpt-focus-outline: 2px solid #2196F3;
  --ivpt-focus-outline-offset: -2px;
}
```

## Example: Dark Theme

```css
:root {
  --ivpt-border-color-standard: #424242;
  --ivpt-border-color-resize: #616161;
  --ivpt-background-standard: #2C2C2C;
  --ivpt-background-row-hover: #383838;
  --ivpt-background-row-selected: #1E3A5F;
  --ivpt-button-background-standard: #424242;
  --ivpt-button-background-highlight: #616161;
  --ivpt-text-color: #E0E0E0;
  --ivpt-text-color-secondary: #B0B0B0;
  --ivpt-pinned-shadow: 2px 0 8px rgba(0, 0, 0, 0.5);
  --ivpt-focus-outline: 2px solid #64B5F6;
}
```

## Example: Custom Brand Theme

```css
:root {
  --ivpt-border-color-standard: #E1BEE7;
  --ivpt-background-standard: #F3E5F5;
  --ivpt-background-row-hover: #FCE4EC;
  --ivpt-background-row-selected: #F8BBD0;
  --ivpt-button-background-standard: #CE93D8;
  --ivpt-button-background-highlight: #AB47BC;
  --ivpt-text-color: #4A148C;
  --ivpt-focus-outline: 2px solid #9C27B0;
}
```

## Usage in Angular

Add your custom theme to your global `styles.scss`:

```scss
// styles.scss
:root {
  --ivpt-background-standard: #your-color;
  // ... other variables
}
```

Or create a separate theme file and import it in your `angular.json`.
