import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDataTableComponent } from '../../components/generic-data-table/generic-data-table.component';
import { TableConfig, TableAction } from '../../models/table-config.model';
import { FilterConfig } from '../../models/filter-config.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, GenericDataTableComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss'
})
export class CategoriesPageComponent implements OnInit {
  categories: any[] = [];
  allCategories: any[] = []; // Store all loaded categories (original data)
  filteredCategories: any[] = []; // Filtered categories (after applying filters)
  totalRecords = 0;
  loading = false;
  currentFilters: any = {
    page: 1,
    page_size: 25
  };
 
  filterConfig: FilterConfig = {
    filters: [
      {
        key: 'status',
        label: 'Status',
        type: 'dropdown',
        options: [
          { name: 'Active', code: 'active' },
          { name: 'Inactive', code: 'inactive' }
        ],
        placeholder: 'Select Status'
      }
    ],
    showClearButton: true
  };

  tableConfig: TableConfig = {
    columns: [
      {
        field: 'id',
        header: 'ID',
        sortable: true,
        width: '80px',
        type: 'number'
      },
      {
        field: 'name',
        header: 'Category Name',
        sortable: true,
        icon: 'pi pi-tag',
        iconColor: '#059669',
        type: 'icon'
      },
      {
        field: 'parent_category',
        header: 'Parent Category',
        sortable: true
      },
      {
        field: 'description',
        header: 'Description',
        sortable: false
      }
    ],
    paginator: true,
    rows: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    globalFilterFields: ['name', 'parent_category', 'description'],
    showExport: true,
    showSearch: false,
    dataKey: 'id'
  };

  tableActions: TableAction[] = [
    {
      icon: 'pi pi-pencil',
      callback: (row) => this.editCategory(row),
      styleClass: 'p-button-rounded p-button-text p-button-sm'
    }
  ];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allCategories = response.data;
          // Apply any existing filters, then pagination
          this.applyFilters(this.currentFilters);
          this.applyPagination();
        } else {
          this.allCategories = [];
          this.filteredCategories = [];
          this.categories = [];
          this.totalRecords = 0;
        }
        this.loading = false;
      },
      error: () => {
        this.allCategories = [];
        this.filteredCategories = [];
        this.categories = [];
        this.totalRecords = 0;
        this.loading = false;
      }
    });
  }

  applyPagination() {
    const page = this.currentFilters.page || 1;
    const pageSize = this.currentFilters.page_size || 25;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // Paginate from filtered categories
    this.categories = this.filteredCategories.slice(startIndex, endIndex);
  }

  editCategory(category: any) {
    // TODO: Implement edit functionality
  }

  onPageChange(event: { page: number; page_size: number }) {
    // Generic component handles pagination internally and emits simple event
    this.currentFilters.page = event.page;
    this.currentFilters.page_size = event.page_size;
    
    // Apply client-side pagination
    this.applyPagination();
  }

  onRowClick(row: any) {
  }

  onExport(format: string) {
    // TODO: Implement export
  }

  onFiltersChanged(filters: any) {
    this.currentFilters = {
      page: 1,
      page_size: this.currentFilters.page_size || 25,
      ...filters
    };
    this.applyFilters(this.currentFilters);
    this.applyPagination();
  }

  applyFilters(filters: any) {
    // Start with all original categories
    let filtered = [...this.allCategories];
    
    // Apply status filter
    if (filters.status) {
      // Assuming categories have a status field - adjust as needed
      filtered = filtered.filter(cat => cat.status === filters.status);
    }
    
    // Update filtered categories and total records
    this.filteredCategories = filtered;
    this.totalRecords = filtered.length;
  }
}
