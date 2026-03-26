import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresentableCellEditorComponent } from '../presentable-cell-editor/presentable-cell-editor.component';
import { CellEditEvent } from '../../interfaces/cell-editor.interface';

@Component({
  selector: 'presentable-row',
  templateUrl: './presentable-row.component.html',
  styleUrl: './presentable-row.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, PresentableCellEditorComponent]
})
export class PresentableRowComponent {

  @Input() columns: any;

  @Input() rowIndex: any;

  @Input() rowSelectionEnabled: any;

  @Input() rowData: any;
  
  @Input() cellEditingEnabled: boolean = false;

  @Output() onSelection = new EventEmitter<any>();
  
  @Output() onCellEdit = new EventEmitter<CellEditEvent>();
  
  editingCell: { field: string } | null = null;

  whenRowSelected($event: any, rowData: any) {
    this.onSelection.emit({'selected': $event.target.checked, 'row': rowData});
  }
  
  startCellEdit(column: any, event?: MouseEvent): void {
    if (!this.cellEditingEnabled || !column.editable) {
      return;
    }
    
    // Prevent starting edit if clicking on checkbox
    if (event && (event.target as HTMLElement).tagName === 'INPUT') {
      return;
    }
    
    this.editingCell = { field: column.field };
  }
  
  onCellEditComplete(column: any, newValue: any): void {
    const oldValue = this.rowData[column.field];
    
    if (oldValue !== newValue) {
      this.rowData[column.field] = newValue;
      
      const editEvent: CellEditEvent = {
        rowData: this.rowData,
        field: column.field,
        oldValue: oldValue,
        newValue: newValue,
        rowIndex: this.rowIndex
      };
      
      this.onCellEdit.emit(editEvent);
    }
    
    this.editingCell = null;
  }
  
  onCellEditCancel(): void {
    this.editingCell = null;
  }
  
  isCellEditing(field: string): boolean {
    return this.editingCell?.field === field;
  }

}
