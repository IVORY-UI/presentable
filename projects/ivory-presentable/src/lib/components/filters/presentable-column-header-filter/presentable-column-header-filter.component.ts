import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Overlay,
  OverlayModule,
  STANDARD_DROPDOWN_BELOW_POSITIONS,
} from '@angular/cdk/overlay';

import { FilterManagerService } from '../../../services/filter-manager.service';

@Component({
  selector: 'presentable-column-header-filter',
  templateUrl: './presentable-column-header-filter.component.html',
  styleUrl: './presentable-column-header-filter.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, FormsModule, OverlayModule],
})
export class PresentableColumnHeaderFilterComponent implements OnChanges {
  private static nextInputId = 0;

  private readonly overlay = inject(Overlay);
  readonly filterManager = inject(FilterManagerService);

  /** Stable id for the text input (overlay is portaled; used for focus). */
  readonly overlayInputId = `ivpt-hf-in-${PresentableColumnHeaderFilterComponent.nextInputId++}`;

  readonly overlayPositions = [...STANDARD_DROPDOWN_BELOW_POSITIONS];
  readonly scrollStrategy = this.overlay.scrollStrategies.reposition();

  @Input() column: any;

  @Output() whenApplied = new EventEmitter<Record<string, unknown>>();

  _open = false;
  _keyword = '';
  _taxonomy: { option: string; isSelected: boolean }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['column'] && this.column?.filterType === 'options' && this.column.filterOptions) {
      this._taxonomy = this.filterManager.processFilterOptions(this.column.filterOptions);
    }
  }

  get isText(): boolean {
    return this.column?.filterType === 'text';
  }

  get isOptions(): boolean {
    return this.column?.filterType === 'options';
  }

  get filterActive(): boolean {
    const field = this.column?.field;
    if (!field) {
      return false;
    }
    const q = this.filterManager.getQueryModel()[field];
    return q != null && Object.keys(q).length > 0;
  }

  togglePanel(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this._open) {
      this.close();
      return;
    }
    this.open();
  }

  open(): void {
    const field = this.column?.field;
    if (!field) {
      return;
    }
    const existing = this.filterManager.getQueryModel()[field];
    if (this.isText) {
      this._keyword =
        existing?.type === 'text' && existing?.keyword != null
          ? String(existing.keyword)
          : '';
    } else if (this.isOptions) {
      const selected: string[] =
        existing?.type === 'options' && Array.isArray(existing?.values)
          ? existing.values
          : [];
      for (const row of this._taxonomy) {
        row.isSelected = selected.includes(row.option);
      }
    }
    this._open = true;
  }

  close(): void {
    this._open = false;
  }

  onOverlayOutsideClick(): void {
    this.close();
  }

  onOverlayAttach(): void {
    if (!this.isText) {
      return;
    }
    queueMicrotask(() => {
      const input = document.getElementById(this.overlayInputId) as HTMLInputElement | null;
      input?.focus();
      input?.select();
    });
  }

  onOverlayDetach(): void {
    this._open = false;
  }

  applyText(event?: Event): void {
    event?.stopPropagation();
    this.whenApplied.emit({
      column: this.column.field,
      type: this.column.filterType,
      keyword: this._keyword ?? '',
    });
    this.close();
  }

  onTextKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.applyText();
    }
  }

  applyOptions(event?: Event): void {
    event?.stopPropagation();
    const applied: string[] = [];
    for (const item of this._taxonomy) {
      if (item.isSelected) {
        applied.push(item.option);
      }
    }
    this.whenApplied.emit({
      column: this.column.field,
      type: this.column.filterType,
      values: applied,
    });
    this.close();
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this._open) {
      event.preventDefault();
      this.close();
    }
  }
}
