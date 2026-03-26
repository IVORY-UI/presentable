import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CellEditorConfig } from '../../interfaces/cell-editor.interface';

@Component({
  selector: 'presentable-cell-editor',
  templateUrl: './presentable-cell-editor.component.html',
  styleUrl: './presentable-cell-editor.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PresentableCellEditorComponent implements OnInit, AfterViewInit {
  
  @Input() value: any;
  @Input() editorConfig: CellEditorConfig = { type: 'text' };
  @Input() field: string = '';
  
  @Output() valueChange = new EventEmitter<any>();
  @Output() editComplete = new EventEmitter<any>();
  @Output() editCancel = new EventEmitter<void>();
  
  @ViewChild('editorInput') editorInput!: ElementRef;
  
  editValue: any;
  
  ngOnInit(): void {
    this.editValue = this.value;
  }
  
  ngAfterViewInit(): void {
    // Auto-focus the input when editor opens
    if (this.editorInput) {
      setTimeout(() => {
        this.editorInput.nativeElement.focus();
        if (this.editorConfig.type === 'text') {
          this.editorInput.nativeElement.select();
        }
      }, 0);
    }
  }
  
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.saveEdit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelEdit();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.saveEdit();
    }
  }
  
  onBlur(): void {
    // Save on blur
    this.saveEdit();
  }
  
  saveEdit(): void {
    if (this.editValue !== this.value) {
      this.valueChange.emit(this.editValue);
      this.editComplete.emit(this.editValue);
    } else {
      this.editCancel.emit();
    }
  }
  
  cancelEdit(): void {
    this.editValue = this.value;
    this.editCancel.emit();
  }
  
  getEditorType(): string {
    return this.editorConfig.type || 'text';
  }
}
