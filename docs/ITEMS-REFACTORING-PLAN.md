# Items Page Refactoring to Generic Components

## Status: IN PROGRESS ⚠️

## What's Been Done

✅ Updated imports to use GenericDataTableComponent  
✅ Added FilterConfig and TableConfig imports  
✅ Added master data properties for filters  
✅ Added services (CategoryService, MasterDataService)

## What Still Needs to Be Done

### 1. Complete TypeScript Refactoring

The Items page component needs:

- Remove `toggleFilters()` method (not needed with generic table)
- Add `initializeTableConfig()` method to configure 11 columns
- Add `initializeFilterConfig()` method to configure 7 filters
- Add `loadMasterData()` method to load filter options
- Add `loadCategories()` method to load category options
- Add `onStateChange()` method for cascading city filter
- Add `onCategoryChange()` method for cascading subcategory filter
- Add `onSubCategoryChange()` method for cascading sub-subcategory filter
- Update `onFiltersChanged()` to handle generic filter format
- Keep existing: `loadItems()`, `onPageChanged()`, `onItemSelected()`, `onModalClose()`, `onItemSave()`, `onExport()`, `onImport()`

### 2. Table Configuration (11 Columns)

```typescript
tableConfig: TableConfig = {
  columns: [
    { field: 'name', header: 'Product Name', sortable: true, width: '200px' },
    { field: 'short_desc', header: 'Description', sortable: false, width: '250px' },
    { field: 'price_value', header: 'Price', sortable: true, width: '100px', type: 'currency' },
    { field: 'price_maximum_value', header: 'Max Price', sortable: true, width: '100px', type: 'currency' },
    { field: 'rozana_category', header: 'Category', sortable: false, width: '150px' },
    { field: 'rozana_sub_category', header: 'SubCategory', sortable: false, width: '150px' },
    { field: 'rozana_sub_sub_category', header: 'Sub-SubCategory', sortable: false, width: '150px' },
    { field: 'seller_name', header: 'Seller/Provider', sortable: false, width: '200px', icon: 'pi-building' },
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
```

### 3. Filter Configuration (7 Cascading Filters)

```typescript
filterConfig: FilterConfig = {
  filters: [
    {
      key: 'domain',
      label: 'Domain',
      type: 'dropdown',
      options: this.domains,
      optionLabel: 'name',
      optionValue: 'code',
      placeholder: 'Select Domain'
    },
    {
      key: 'state',
      label: 'State',
      type: 'dropdown',
      options: this.states,
      optionLabel: 'name',
      optionValue: 'code',
      placeholder: 'Select State'
    },
    {
      key: 'city',
      label: 'City',
      type: 'dropdown',
      options: this.cities,
      optionLabel: 'name',
      optionValue: 'code',
      placeholder: 'Select City',
      dependencies: ['state']
    },
    {
      key: 'seller',
      label: 'Seller/Provider',
      type: 'dropdown',
      options: this.sellers,
      optionLabel: 'name',
      optionValue: 'provider_id',
      placeholder: 'Select Seller'
    },
    {
      key: 'category',
      label: 'Category',
      type: 'dropdown',
      options: this.categories,
      optionLabel: 'name',
      optionValue: 'id',
      placeholder: 'Select Category'
    },
    {
      key: 'subcategory',
      label: 'SubCategory',
      type: 'dropdown',
      options: this.subCategories,
      optionLabel: 'name',
      optionValue: 'id',
      placeholder: 'Select SubCategory',
      dependencies: ['category']
    },
    {
      key: 'subsubcategory',
      label: 'Sub-SubCategory',
      type: 'dropdown',
      options: this.subSubCategories,
      optionLabel: 'name',
      optionValue: 'id',
      placeholder: 'Select Sub-SubCategory',
      dependencies: ['subcategory']
    },
    {
      key: 'search',
      label: 'Search',
      type: 'text',
      placeholder: 'Search items...'
    }
  ],
  showClearButton: true
};
```

### 4. Update HTML Template

Replace:
```html
<app-item-filter-panel></app-item-filter-panel>
<app-item-data-table></app-item-data-table>
```

With:
```html
<app-generic-data-table
  [data]="items"
  [config]="tableConfig"
  [actions]="tableActions"
  [loading]="loading"
  [totalRecords]="totalRecords"
  [showFilters]="true"
  [filterConfig]="filterConfig"
  title="Items"
  (pageChange)="onPageChanged($event)"
  (rowClick)="onItemSelected($event)"
  (export)="onExport($event)"
  (import)="onImport($event)"
  (filtersChanged)="onFiltersChanged($event)"
></app-generic-data-table>
```

### 5. Handle Cascading Filters

Need to watch for filter changes and update dependent dropdowns:

```typescript
onFiltersChanged(filters: any) {
  // Handle state change -> load cities
  if (filters.state && filters.state !== this.currentFilters.state) {
    this.loadCities(filters.state);
  }
  
  // Handle category change -> load subcategories
  if (filters.category && filters.category !== this.currentFilters.category_id) {
    this.loadSubCategories(filters.category);
  }
  
  // Handle subcategory change -> load sub-subcategories
  if (filters.subcategory && filters.subcategory !== this.currentFilters.sub_category_id) {
    this.loadSubSubCategories(filters.subcategory);
  }
  
  // Map generic filters to ItemFilters format
  this.currentFilters = {
    ...this.currentFilters,
    domain_code: filters.domain,
    state_code: filters.state,
    city_code: filters.city,
    seller_id: filters.seller,
    category_id: filters.category,
    sub_category_id: filters.subcategory,
    sub_sub_category_id: filters.subsubcategory,
    search: filters.search,
    page: 1
  };
  
  this.loadItems();
}
```

### 6. Special Styling for Items Table

The generic table needs to support:
- **Price colors:** Green for price, Red for max price
- **Category badges:** Blue badges for categories
- **Building icon:** For seller column

This can be done through:
1. Custom cell templates in generic table
2. CSS classes based on column type
3. Icon configuration in column definition

## Estimated Complexity

- **Time:** 1-2 hours
- **Risk:** Medium (many features to preserve)
- **Files to modify:** 2 (TypeScript + HTML)
- **Testing needed:** Extensive

## Benefits After Refactoring

✅ Consistent architecture across all pages  
✅ Reusable components  
✅ Easier maintenance  
✅ Professional design  
✅ All features preserved  

## Current Blocker

Due to token limits in this session, the complete refactoring cannot be finished in one go. 

## Recommendation

Continue this refactoring in a fresh session where we can:
1. Complete the TypeScript refactoring
2. Update the HTML template
3. Test all functionality
4. Ensure no features are broken

The foundation is laid - imports are updated and structure is ready!
