import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnResizeDirective } from './presentable-column-resizer.directive';

@Component({
  selector: 'presentable-column-resizer',
  template: `
    <div class="ivpt-resize-anchor"
      presentableColumnResizer
      [ngClass]="{'ivpt-resize-handle': resizable, 'ivpt-resize-not-allowed': !resizable}"
      (updatedColumnWidth)="updatedColumnWidth.emit(+$event)"
    ></div>
  `,
  styleUrl: './presentable-column-resizer.component.scss',
  standalone: true,
  imports: [CommonModule, ColumnResizeDirective]
})
export class PresentableColumnResizerComponent {

  @Input() resizable: boolean = false;

  @Input() minWidth: number | string | undefined = '';

  @Input() maxWidth: number | string | undefined = '';

  @Output() updatedColumnWidth: EventEmitter<number> = new EventEmitter();

}
