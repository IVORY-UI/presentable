import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColumnSizingService } from '../../services/column-sizing.service';

@Component({
  selector: 'presentable-column-controls',
  templateUrl: './presentable-column-controls.component.html',
  styleUrl: './presentable-column-controls.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PresentableColumnControlsComponent {

  _showController: boolean = false;
  draggingItem: any;
  isDraggingOver = false;
  draftColumns: any[] = [];

  @Input() columns: any;

  @Output() updatedColumns = new EventEmitter<any[]>();

  constructor(
    public columnSizing: ColumnSizingService
  ) {}

  onDragStart(event: DragEvent, item: any) {
    console.log('drag started');
    this.draggingItem = item;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log('dragging');
  }

  onDrop(event: DragEvent, index: number) {
    console.log('dropped', index);
    if (this.draggingItem) {
      const draggingIndex = this.draftColumns.indexOf(this.draggingItem);
      if (draggingIndex > -1) {
        this.draftColumns.splice(draggingIndex, 1);
        this.draftColumns.splice(index, 0, this.draggingItem);
        this.draggingItem = null;
      }
    }
  }

  getDropIndex(event: any) {
    const target = event.target as HTMLElement;
    const targetIndex = Array.from(target.parentNode!.children).indexOf(target);
    return targetIndex;
  }

  toggleColumn(column: any) {
    column.visible=!column.visible;
  }

  openColumnControls() {
    this._showController = !this._showController;
    if (this._showController) {
      this.draftColumns = structuredClone(this.columns || []);
    }
  }

  saveColumns() {
    this.updatedColumns.emit(structuredClone(this.draftColumns));
    this._showController = false;
    this.columnSizing.reCalcWidth.next(true);
  }

}
