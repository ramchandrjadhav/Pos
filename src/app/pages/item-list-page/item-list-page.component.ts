import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDataTableComponent } from '../../components/generic-data-table/generic-data-table.component';
import { ItemDetailModalComponent } from '../../components/item-detail-modal/item-detail-modal.component';
import { ItemService } from '../../services/item.service';
import { CategoryService } from '../../services/category.service';
import { MasterDataService } from '../../services/master-data.service';
import { Item, ItemFilters } from '../../models/item.model';
import { TableConfig, TableAction } from '../../models/table-config.model';
import { FilterConfig } from '../../models/filter-config.model';

@Component({
  selector: 'app-item-list-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericDataTableComponent,
    ItemDetailModalComponent
  ],
  templateUrl: './item-list-page.component.html',
  styleUrls: ['./item-list-page.component.scss']
})
export class ItemListPageComponent implements OnInit {
  items: Item[] = [];
  loading = false;
  totalRecords = 0;
  currentFilters: ItemFilters = {
    page: 1,
    page_size: 10
  };
  
  showDetailModal = false;
  selectedItem: Item | null = null;

  // Master data for filters
  domains: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  sellers: any[] = [];
  categories: any[] = [];
  subCategories: any[] = [];
  subSubCategories: any[] = [];

  filterConfig!: FilterConfig;
  tableConfig!: TableConfig;
  tableActions: TableAction[] = [];

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private masterDataService: MasterDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeTableConfig();
    this.initializeFilterConfig();
    this.loadMasterData();
    this.loadCategories();
    this.loadItems();
  }

  initializeTableConfig() {
    this.tableConfig = {
      columns: [
        { field: 'name', header: 'Product Name', sortable: true, width: '200px' },
        { field: 'provider_name', header: 'Seller/Provider', sortable: false, width: '180px', icon: 'pi-building', format: (row: any) => row.provider_name || row.seller_name || '-' },
        { field: 'short_desc', header: 'Description', sortable: false, width: '200px' },
        { field: 'price_value', header: 'Price', sortable: true, width: '100px' },
        { field: 'price_maximum_value', header: 'Max Price', sortable: true, width: '100px' },
        { field: 'rozana_category_name', header: 'Category', sortable: false, width: '150px' },
        { field: 'rozana_sub_category_name', header: 'SubCategory', sortable: false, width: '150px' },
        { field: 'rozana_sub_sub_category_name', header: 'Sub-SubCategory', sortable: false, width: '150px' },
        { field: 'city', header: 'City', sortable: false, width: '120px' },
        { field: 'state', header: 'State', sortable: false, width: '120px' }
      ],
      paginator: true,
      rows: 10,
      rowsPerPageOptions: [10, 25, 50, 100],
      showSearch: false,
      showExport: true,
      showImport: true
    };

    this.tableActions = [
      {
        icon: 'pi pi-eye',
        callback: (row: any) => this.onItemSelected(row),
        styleClass: 'p-button-rounded p-button-text p-button-sm'
      }
    ];
  }

  initializeFilterConfig() {
    this.filterConfig = {
      filters: [
        {
          key: 'domain_code',
          label: 'Domain',
          type: 'dropdown',
          options: this.domains,
          optionLabel: 'name',
          optionValue: 'code',
          placeholder: 'Select Domain'
        },
        {
          key: 'state_code',
          label: 'State',
          type: 'dropdown',
          options: this.states,
          optionLabel: 'name',
          optionValue: 'code',
          placeholder: 'Select State'
        },
        {
          key: 'city_code',
          label: 'City',
          type: 'dropdown',
          options: this.cities,
          optionLabel: 'name',
          optionValue: 'code',
          placeholder: 'Select City',
          dependencies: ['state_code']
        },
        {
          key: 'provider_id',
          label: 'Seller/Provider',
          type: 'dropdown',
          options: this.sellers,
          optionLabel: 'name',
          optionValue: 'provider_id',
          placeholder: 'Select Seller'
        },
        {
          key: 'category_id',
          label: 'Category',
          type: 'dropdown',
          options: this.categories,
          optionLabel: 'name',
          optionValue: 'id',
          placeholder: 'Select Category'
        },
        {
          key: 'sub_category_id',
          label: 'SubCategory',
          type: 'dropdown',
          options: this.subCategories,
          optionLabel: 'name',
          optionValue: 'id',
          placeholder: 'Select SubCategory',
          dependencies: ['category_id']
        },
        {
          key: 'sub_sub_category_id',
          label: 'Sub-SubCategory',
          type: 'dropdown',
          options: this.subSubCategories,
          optionLabel: 'name',
          optionValue: 'id',
          placeholder: 'Select Sub-SubCategory',
          dependencies: ['sub_category_id']
        },
        {
          key: 'has_category_mapping',
          label: 'Category Mapping',
          type: 'dropdown',
          options: [
            { name: 'All Items', code: null },
            { name: 'Mapped (Has Category)', code: 'true' },
            { name: 'Unmapped (No Category)', code: 'false' }
          ],
          optionLabel: 'name',
          optionValue: 'code',
          placeholder: 'Filter by mapping status'
        }
      ],
      showClearButton: true
    };
  }

  loadMasterData() {
    this.masterDataService.getDomains().subscribe({
      next: (response) => {
        this.domains = response.data;
        this.updateFilterOptions('domain_code', this.domains);
      }
    });

    this.masterDataService.getStates().subscribe({
      next: (response) => {
        // Transform array of strings to array of objects with name and code
        if (Array.isArray(response.data) && response.data.length > 0 && typeof response.data[0] === 'string') {
          this.states = response.data.map((state: any) => ({
            name: state,
            code: state
          }));
        } else {
          this.states = response.data;
        }
        this.updateFilterOptions('state_code', this.states);
      }
    });

    this.masterDataService.getSellers().subscribe({
      next: (response) => {
        this.sellers = response.data;
        this.updateFilterOptions('provider_id', this.sellers);
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        this.updateFilterOptions('category_id', this.categories);
      }
    });
  }

  loadCities(stateCode: string) {
    this.masterDataService.getCities(stateCode).subscribe({
      next: (response) => {
        // Transform array of strings to array of objects with name and code
        if (Array.isArray(response.data) && response.data.length > 0 && typeof response.data[0] === 'string') {
          this.cities = response.data.map((city: any) => ({
            name: city,
            code: city
          }));
        } else {
          this.cities = response.data;
        }
        this.updateFilterOptions('city_code', this.cities);
      }
    });
  }

  loadSubCategories(categoryId: number) {
    this.categoryService.getSubCategories(categoryId).subscribe({
      next: (response) => {
        this.subCategories = response.data;
        this.updateFilterOptions('sub_category_id', this.subCategories);
      }
    });
  }

  loadSubSubCategories(subCategoryId: number) {
    this.categoryService.getSubSubCategories(subCategoryId).subscribe({
      next: (response) => {
        this.subSubCategories = response.data;
        this.updateFilterOptions('sub_sub_category_id', this.subSubCategories);
      }
    });
  }

  updateFilterOptions(filterKey: string, options: any[]) {
    if (!this.filterConfig) {
      this.initializeFilterConfig();
      return;
    }
    
    const filter = this.filterConfig.filters.find(f => f.key === filterKey);
    if (filter) {
      filter.options = options;
    }
  }

  loadItems(showLoading: boolean = true) {
    if (showLoading) {
      this.loading = true;
    }
    this.itemService.getItems(this.currentFilters).subscribe({
      next: (response: any) => {
        // Handle the actual API response structure
        // Response structure: { items: [...], total_count: 867, page: 1, page_size: 10 }
        if (response && response.items) {
          this.items = Array.isArray(response.items) ? response.items : [];
          this.totalRecords = response.total_count || 0;
        } else if (response && response.data && response.data.items) {
          // Fallback for wrapped response
          this.items = Array.isArray(response.data.items) ? response.data.items : [];
          this.totalRecords = response.data.total_count || 0;
        } else {
          this.items = [];
          this.totalRecords = 0;
        }
        
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.items = [];
        this.totalRecords = 0;
        this.loading = false;
      }
    });
  }

  onFiltersChanged(filters: any) {
    const prevFilters: any = { ...this.currentFilters };
    
    // Handle state change -> load cities
    if (filters.state_code && filters.state_code !== prevFilters.state_code) {
      this.loadCities(filters.state_code);
    }
    
    // Handle category change -> load subcategories
    if (filters.category_id && filters.category_id !== prevFilters.category_id) {
      this.loadSubCategories(filters.category_id);
    }
    
    // Handle subcategory change -> load sub-subcategories
    if (filters.sub_category_id && filters.sub_category_id !== prevFilters.sub_category_id) {
      this.loadSubSubCategories(filters.sub_category_id);
    }
    
    // Update filters and reset to page 1 only when filters change
    this.currentFilters = {
      page: 1, // Reset to page 1 when filters change
      page_size: this.currentFilters.page_size || 10,
      ...filters
    } as ItemFilters;
    
    this.loadItems();
  }

  onClearFilters() {
    this.currentFilters = {
      page: 1,
      page_size: 10
    };
    // Generic component will reset pagination internally when filters are cleared
    this.cities = [];
    this.subCategories = [];
    this.subSubCategories = [];
    this.initializeFilterConfig();
    this.loadItems();
  }

  onPageChanged(event: { page: number; page_size: number }) {
    this.currentFilters.page = event.page;
    this.currentFilters.page_size = event.page_size;
    this.loadItems(false);
  }

  onItemSelected(item: Item) {
    this.selectedItem = item;
    this.showDetailModal = true;
  }

  onModalClose() {
    this.showDetailModal = false;
    this.selectedItem = null;
  }

  onItemSave(updatedItem: Item) {
    const items = [{
      id: updatedItem.id,
      rozana_category_id: updatedItem.rozana_category_id,
      rozana_sub_category_id: updatedItem.rozana_sub_category_id,
      rozana_sub_sub_category_id: updatedItem.rozana_sub_sub_category_id
    }];

    this.itemService.bulkUpdateCategories(items).subscribe({
      next: () => {
        this.showDetailModal = false;
        this.loadItems();
      },
      error: () => {
      }
    });
  }

  onExport(format: string) {
    this.itemService.exportItems(this.currentFilters, format).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `items_export.${format}`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
      }
    });
  }

  onImport(file: File) {
    this.itemService.importItems(file, 'csv').subscribe({
      next: () => {
        this.loadItems();
      },
      error: () => {
      }
    });
  }
}
