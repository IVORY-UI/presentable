import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../helpers/click-outside.directive';

import { FilterManagerService } from '../../../services/filter-manager.service';

@Component({
  selector: 'presentable-options-filter',
  templateUrl: './presentable-options-filter.component.html',
  styleUrl: './presentable-options-filter.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective]
})
export class PresentableOptionsFilterComponent {

  _showPopover: boolean = false;

  _taxonomy: any = [];

  @Input() column: any;

  @Input() 
  set taxonomy(value: any) {
    this._taxonomy = this.filterManager.processFilterOptions(value);
  }
  get taxonomy() {
    return this._taxonomy;
  }

  @Output() whenApplied = new EventEmitter<any>();
  emitApplied(value: any) {
    this.whenApplied.emit(value);
  }

  constructor(
    public filterManager: FilterManagerService
  ) {}
  

  toggleFilterPopover() {
    this._showPopover=!this._showPopover;
  }

  applyFilter() {
    this.toggleFilterPopover();
    let appliedObjects: any = [];
    for (const item of this._taxonomy) {
      if (item['isSelected']===true) {
        appliedObjects.push(item['option']);
      }
    }
    this.emitApplied({'column': this.column['field'], 'type': this.column['filterType'], 'values': appliedObjects});
  }

}
