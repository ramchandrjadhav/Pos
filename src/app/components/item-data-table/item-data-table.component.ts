import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { Item, ItemFilters } from '../../models/item.model';

@Component({
  selector: 'app-item-data-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    FileUploadModule
  ],
  templateUrl: './item-data-table.component.html',
  styleUrls: ['./item-data-table.component.scss']
})
export class ItemDataTableComponent {
  @Input() items: Item[] = [];
  @Input() loading = false;
  @Input() totalRecords = 0;
  @Input() currentFilters: ItemFilters = {};

  @Output() pageChanged = new EventEmitter<any>();
  @Output() itemSelected = new EventEmitter<Item>();
  @Output() exportRequested = new EventEmitter<string>();
  @Output() importRequested = new EventEmitter<{ file: File; format: string }>();

  onPageChange(event: any) {
    console.log('ItemDataTableComponent: onPageChange called', event);
    if (event && typeof event.first !== 'undefined' && typeof event.rows !== 'undefined') {
      const page = Math.floor(event.first / event.rows);
      
      const validatedEvent = {
        page: !isNaN(page) ? page : 0,
        rows: !isNaN(event.rows) && event.rows > 0 ? event.rows : 10,
        first: event.first,
        sortField: event.sortField,
        sortOrder: event.sortOrder
      };
      
      console.log('ItemDataTableComponent: Emitting pageChanged event', validatedEvent);
      this.pageChanged.emit(validatedEvent);
    }
  }

  onRowClick(item: Item) {
    console.log('ItemDataTableComponent: onRowClick called', item);
    this.itemSelected.emit(item);
  }

  onEdit(item: Item, event: Event) {
    console.log('ItemDataTableComponent: onEdit called', item);
    event.stopPropagation();
    this.itemSelected.emit(item);
  }

  onExport(format: string) {
    console.log('ItemDataTableComponent: onExport called', format);
    this.exportRequested.emit(format);
  }

  onFileSelected(event: any) {
    console.log('ItemDataTableComponent: onFileSelected called', event);
    const file = event.target.files[0];
    if (file) {
      const format = file.name.endsWith('.csv') ? 'csv' : 'excel';
      console.log('ItemDataTableComponent: File selected', { file: file.name, format });
      this.importRequested.emit({ file, format });
    }
  }
}
