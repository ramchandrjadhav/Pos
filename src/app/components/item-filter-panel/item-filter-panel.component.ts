import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../services/category.service';
import { MasterDataService } from '../../services/master-data.service';
import { ItemFilters } from '../../models/item.model';
import { Category, SubCategory, SubSubCategory } from '../../models/category.model';
import { State, City, Domain, Seller } from '../../models/master-data.model';

@Component({
  selector: 'app-item-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './item-filter-panel.component.html',
  styleUrls: ['./item-filter-panel.component.scss']
})
export class ItemFilterPanelComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<ItemFilters>();
  @Output() clearFilters = new EventEmitter<void>();

  filters: any = {};
  selectedState: string = '';

  // Master data
  domains: Domain[] = [];
  states: State[] = [];
  cities: City[] = [];
  sellers: Seller[] = [];

  // Categories
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  subSubCategories: SubSubCategory[] = [];

  constructor(
    private categoryService: CategoryService,
    private masterDataService: MasterDataService
  ) {}

  ngOnInit() {
    this.loadMasterData();
    this.loadCategories();
  }

  loadMasterData() {
    // Load domains
    this.masterDataService.getDomains().subscribe({
      next: (response) => {
        this.domains = response.data;
      },
      error: () => {}
    });

    // Load states
    this.masterDataService.getStates().subscribe({
      next: (response) => {
        this.states = response.data;
      },
      error: () => {}
    });

    // Load sellers
    this.masterDataService.getSellers().subscribe({
      next: (response) => {
        this.sellers = response.data;
      },
      error: () => {}
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: () => {}
    });
  }

  onStateChange() {
    this.filters.city = null;
    this.cities = [];

    if (this.selectedState) {
      this.masterDataService.getCities(this.selectedState).subscribe({
        next: (response) => {
          this.cities = response.data;
        },
        error: () => {}
      });
    }

    this.onFilterChange();
  }

  onCategoryChange() {
    this.filters.rozana_sub_category_id = null;
    this.filters.rozana_sub_sub_category_id = null;
    this.subCategories = [];
    this.subSubCategories = [];

    if (this.filters.rozana_category_id) {
      this.categoryService.getSubCategories(this.filters.rozana_category_id).subscribe({
        next: (response) => {
          this.subCategories = response.data;
        },
        error: () => {}
      });
    }

    this.onFilterChange();
  }

  onSubCategoryChange() {
    this.filters.rozana_sub_sub_category_id = null;
    this.subSubCategories = [];

    if (this.filters.rozana_sub_category_id) {
      this.categoryService.getSubSubCategories(
        this.filters.rozana_category_id,
        this.filters.rozana_sub_category_id
      ).subscribe({
        next: (response) => {
          this.subSubCategories = response.data;
        },
        error: () => {}
      });
    }

    this.onFilterChange();
  }

  onFilterChange() {
    const cleanFilters: any = {};
    
    Object.keys(this.filters).forEach(key => {
      if (this.filters[key] !== null && this.filters[key] !== undefined && this.filters[key] !== '') {
        cleanFilters[key] = this.filters[key];
      }
    });

    this.filtersChanged.emit(cleanFilters);
  }

  clearAllFilters() {
    this.filters = {};
    this.selectedState = '';
    this.cities = [];
    this.subCategories = [];
    this.subSubCategories = [];
    this.clearFilters.emit();
  }
}
