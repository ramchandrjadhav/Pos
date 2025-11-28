import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TableConfig, TableAction } from '../../models/table-config.model';
import { FilterConfig } from '../../models/filter-config.model';
import { GenericFilterPanelComponent } from '../generic-filter-panel/generic-filter-panel.component';

@Component({
  selector: 'app-generic-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    GenericFilterPanelComponent
  ],
  templateUrl: './generic-data-table.component.html',
  styleUrl: './generic-data-table.component.scss'
})
export class GenericDataTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: any[] = [];
  @Input() config!: TableConfig;
  @Input() actions: TableAction[] = [];
  @Input() loading = false;
  @Input() totalRecords = 0;
  @Input() title = '';
  @Input() showFilters = false;
  @Input() filterConfig?: FilterConfig;
  
  // Emit simple pagination event: { page: number, page_size: number }
  // Page is 1-based for API calls
  @Output() pageChange = new EventEmitter<{ page: number; page_size: number }>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() export = new EventEmitter<string>();
  @Output() import = new EventEmitter<File>();
  @Output() filtersChanged = new EventEmitter<any>(); 
  
  searchValue = '';
  filtersVisible = false;
  
  // Internal pagination state - managed completely by this component
  first = 0;
  
  private toggleFiltersListener: any;
  private closeFiltersListener: any;

  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    // Listen for filter toggle from header
    this.toggleFiltersListener = (event: any) => {
      if (this.showFilters) {
        this.filtersVisible = event.detail.open;
        // Notify app component about filter state
        window.dispatchEvent(new CustomEvent('filtersStateChanged', {
          detail: { open: this.filtersVisible }
        }));
        this.cdr.detectChanges();
      }
    };
    
    // Listen for close filters command (from sidebar opening)
    this.closeFiltersListener = () => {
      if (this.showFilters && this.filtersVisible) {
        this.filtersVisible = false;
        // Notify app component that filters are closed
        window.dispatchEvent(new CustomEvent('filtersStateChanged', {
          detail: { open: false }
        }));
        this.cdr.detectChanges();
      }
    };
    
    window.addEventListener('toggleFilters', this.toggleFiltersListener);
    window.addEventListener('closeFilters', this.closeFiltersListener);
    
    // Initialize filter visibility based on showFilters input
    this.filtersVisible = this.showFilters;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalRecords'] && !changes['totalRecords'].firstChange) {
      const prevTotal = changes['totalRecords'].previousValue || 0;
      const currTotal = changes['totalRecords'].currentValue || 0;
      if (currTotal < prevTotal * 0.5 && this.first > 0) {
        this.first = 0;
        this.cdr.detectChanges();
      }
    }
    if (changes['data'] && changes['data'].currentValue && this.first > 0) {
      const rows = this.config?.rows || 10;
      const maxFirst = Math.max(0, (Math.ceil(this.totalRecords / rows) - 1) * rows);
      if (this.first > maxFirst) {
        this.first = 0;
        this.cdr.detectChanges();
      }
    }
  }

  ngOnDestroy() {
    window.removeEventListener('toggleFilters', this.toggleFiltersListener);
    window.removeEventListener('closeFilters', this.closeFiltersListener);
  }
  
  onPageChange(event: any) {
    // Handle pagination internally - calculate page and emit simple event
    const first = Number(event.first) || 0;
    const rows = Number(event.rows) || this.config?.rows || 10;
    const page = Math.floor(first / rows); // 0-based page number
    
    // Update internal first value
    this.first = first;
    
    // Emit simple pagination event (page is 1-based for API)
    this.pageChange.emit({
      page: page + 1, // Convert to 1-based for API
      page_size: rows
    });
  }
  
  onRowClick(row: any) {
    this.rowClick.emit(row);
  }
  
  onExport(format: string) {
    this.export.emit(format);
  }
  
  onImport(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.import.emit(file);
    }
  }
  
  executeAction(action: TableAction, row: any) {
    action.callback(row);
  }
  
  isActionVisible(action: TableAction, row: any): boolean {
    return action.visible ? action.visible(row) : true;
  }
  
  getFieldValue(row: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], row);
  }
  
  onFiltersChanged(filters: any) {
    // Reset pagination when filters change
    this.first = 0;
    this.cdr.detectChanges();
    this.filtersChanged.emit(filters);
  }
  
  onClearFilters() {
    // Reset pagination when clearing filters
    this.first = 0;
    this.cdr.detectChanges();
    this.filtersChanged.emit({});
  }
}
