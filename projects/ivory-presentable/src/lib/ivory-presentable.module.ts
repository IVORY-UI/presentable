import { NgModule } from '@angular/core';

/* Components */
import { IvoryPresentableComponent } from './ivory-presentable.component';
import { PresentableRowComponent } from './components/presentable-row/presentable-row.component';
import { PresentableCellEditorComponent } from './components/presentable-cell-editor/presentable-cell-editor.component';
import { PresentableColumnResizerComponent } from './components/presentable-column-resizer/presentable-column-resizer.component';
import { PresentableColumnControlsComponent } from './components/presentable-column-controls/presentable-column-controls.component';
import { PresentablePaginatorComponent } from './components/presentable-paginator/presentable-paginator.component';
import { PresentableTextFilterComponent } from './components/filters/presentable-text-filter/presentable-text-filter.component';
import { PresentableOptionsFilterComponent } from './components/filters/presentable-options-filter/presentable-options-filter.component';
import { PresentableColumnHeaderFilterComponent } from './components/filters/presentable-column-header-filter/presentable-column-header-filter.component';

/* Directives */
import { ClickOutsideDirective } from './helpers/click-outside.directive';
import { ColumnResizeDirective } from './components/presentable-column-resizer/presentable-column-resizer.directive';

@NgModule({
  imports: [
    IvoryPresentableComponent,
    PresentableRowComponent,
    PresentableCellEditorComponent,
    PresentableTextFilterComponent,
    PresentableOptionsFilterComponent,
    PresentableColumnHeaderFilterComponent,
    PresentableColumnResizerComponent,
    PresentableColumnControlsComponent,
    PresentablePaginatorComponent,
    ClickOutsideDirective,
    ColumnResizeDirective
  ],
  exports: [
    IvoryPresentableComponent,
    PresentableRowComponent,
    PresentableCellEditorComponent,
    PresentableTextFilterComponent,
    PresentableOptionsFilterComponent,
    PresentableColumnHeaderFilterComponent,
    PresentableColumnResizerComponent,
    PresentableColumnControlsComponent,
    PresentablePaginatorComponent,
    ClickOutsideDirective,
    ColumnResizeDirective
  ]
})
export class IvoryPresentableModule { }
