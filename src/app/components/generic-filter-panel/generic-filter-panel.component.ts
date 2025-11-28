import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FilterConfig, FilterField } from '../../models/filter-config.model';

@Component({
  selector: 'app-generic-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    ButtonModule
  ],
  templateUrl: './generic-filter-panel.component.html',
  styleUrl: './generic-filter-panel.component.scss'
})
export class GenericFilterPanelComponent implements OnInit, OnChanges {
  @Input() config!: FilterConfig;
  @Output() filtersChanged = new EventEmitter<any>();
  @Output() clearFilters = new EventEmitter<void>();

  filterValues: any = {};
  private isInitialized = false;

  ngOnInit() {
    this.initializeFilters();
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only reinitialize if config actually changed and we're already initialized
    if (changes['config'] && this.isInitialized) {
      this.initializeFilters();
    }
  }

  initializeFilters() {
    this.config.filters.forEach(filter => {
      this.filterValues[filter.key] = filter.value || null;
    });
  }

  onFilterChange(key: string, value: any) {
    this.filterValues[key] = value;
    
    // Handle dependencies - clear dependent filters
    const filter = this.config.filters.find(f => f.key === key);
    if (filter) {
      this.config.filters.forEach(f => {
        if (f.dependencies?.includes(key)) {
          this.filterValues[f.key] = null;
        }
      });
    }
    
    this.emitFilters();
  }

  onClearFilters() {
    this.initializeFilters();
    this.clearFilters.emit();
    this.emitFilters();
  }

  emitFilters() {
    const activeFilters = Object.keys(this.filterValues)
      .filter(key => this.filterValues[key] !== null && this.filterValues[key] !== '')
      .reduce((obj, key) => {
        obj[key] = this.filterValues[key];
        return obj;
      }, {} as any);
    
    this.filtersChanged.emit(activeFilters);
  }

  isFilterDisabled(filter: FilterField): boolean {
    if (filter.disabled) return true;
    
    if (filter.dependencies && filter.dependencies.length > 0) {
      return filter.dependencies.some(dep => !this.filterValues[dep]);
    }
    
    return false;
  }
}
