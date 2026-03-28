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
  /** Column object being dragged (from draftColumns). */
  draggingItem: any = null;
  /**
   * Insert position: a dashed drop slot is shown before this index (0 … length).
   * `length` means after the last row.
   */
  dropMarkerIndex: number | null = null;

  draftColumns: any[] = [];

  @Input() columns: any;

  @Output() updatedColumns = new EventEmitter<any[]>();

  constructor(
    public columnSizing: ColumnSizingService
  ) {}

  onDragStart(event: DragEvent, item: any, index: number) {
    this.draggingItem = item;
    this.dropMarkerIndex = index;
    event.dataTransfer?.setData('text/plain', String(index));
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
    // Slight delay so the browser still paints the row before opacity applies.
    requestAnimationFrame(() => {
      const el = event.target as HTMLElement | null;
      el?.classList.add('ivpt-column-select-item--source');
    });
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    if (!this.draggingItem) {
      return;
    }
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const insertBefore = event.clientY < midY;
    let marker = insertBefore ? index : index + 1;
    const len = this.draftColumns.length;
    marker = Math.max(0, Math.min(marker, len));
    this.dropMarkerIndex = marker;
  }

  onDragEnter(event: DragEvent, index: number) {
    event.preventDefault();
    this.onDragOver(event, index);
  }

  onListDragLeave(event: DragEvent) {
    const related = event.relatedTarget as Node | null;
    const current = event.currentTarget as Node;
    if (related && current.contains(related)) {
      return;
    }
    this.dropMarkerIndex = null;
  }

  onDropSlotDragOver(event: DragEvent, markerIndex: number) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    if (this.draggingItem) {
      const len = this.draftColumns.length;
      this.dropMarkerIndex = Math.max(0, Math.min(markerIndex, len));
    }
  }

  onDropSlotDrop(event: DragEvent, markerIndex: number) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.draggingItem) {
      return;
    }
    const len = this.draftColumns.length;
    this.dropMarkerIndex = Math.max(0, Math.min(markerIndex, len));
    this.onDrop(event);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.draggingItem || this.dropMarkerIndex === null) {
      this.resetDragState();
      return;
    }
    const from = this.draftColumns.indexOf(this.draggingItem);
    if (from < 0) {
      this.resetDragState();
      return;
    }
    let marker = this.dropMarkerIndex;
    marker = Math.max(0, Math.min(marker, this.draftColumns.length));

    const [removed] = this.draftColumns.splice(from, 1);
    let insertAt = marker;
    if (from < marker) {
      insertAt = marker - 1;
    }
    insertAt = Math.max(0, Math.min(insertAt, this.draftColumns.length));
    this.draftColumns.splice(insertAt, 0, removed);

    this.resetDragState();
  }

  onDragEnd(event: DragEvent) {
    (event.target as HTMLElement)?.classList.remove('ivpt-column-select-item--source');
    this.resetDragState();
  }

  private resetDragState() {
    this.draggingItem = null;
    this.dropMarkerIndex = null;
  }

  showDropSlotBefore(index: number): boolean {
    return this.dropMarkerIndex !== null && this.dropMarkerIndex === index;
  }

  showDropSlotAfterLast(): boolean {
    const len = this.draftColumns.length;
    return (
      this.dropMarkerIndex !== null &&
      len > 0 &&
      this.dropMarkerIndex === len
    );
  }

  toggleColumn(column: any) {
    column.visible = !column.visible;
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
