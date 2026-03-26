import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CellEditEvent } from '../interfaces/cell-editor.interface';

@Injectable({
  providedIn: 'root'
})
export class CellEditorService {
  
  private editingCell: { rowIndex: number; field: string } | null = null;
  
  cellEditStart$ = new Subject<{ rowIndex: number; field: string }>();
  cellEditEnd$ = new Subject<CellEditEvent>();
  cellEditCancel$ = new Subject<{ rowIndex: number; field: string }>();

  startEditing(rowIndex: number, field: string): void {
    this.editingCell = { rowIndex, field };
    this.cellEditStart$.next({ rowIndex, field });
  }

  stopEditing(event: CellEditEvent): void {
    this.editingCell = null;
    this.cellEditEnd$.next(event);
  }

  cancelEditing(rowIndex: number, field: string): void {
    this.editingCell = null;
    this.cellEditCancel$.next({ rowIndex, field });
  }

  isEditing(rowIndex: number, field: string): boolean {
    return this.editingCell?.rowIndex === rowIndex && this.editingCell?.field === field;
  }

  getEditingCell(): { rowIndex: number; field: string } | null {
    return this.editingCell;
  }
}
