# Generic Data Table Component - Implementation Guide

## Overview

A reusable, configuration-based data table component for displaying and managing data across the application. Built with PrimeNG Table and Angular standalone components.

## Features

✅ **Configuration-Based** - Define columns and behavior through config objects  
✅ **Sortable Columns** - Enable sorting on any column  
✅ **Pagination** - Built-in pagination with customizable options  
✅ **Search** - Global search functionality  
✅ **Export/Import** - CSV/Excel export and import  
✅ **Actions** - Configurable row actions  
✅ **Icons** - Support for icons in headers and cells  
✅ **Badges** - Display data as badges  
✅ **Responsive** - Mobile-friendly design  
✅ **Professional Styling** - Consistent with ONDC design system  

---

## Installation

The component is already created at:
- **Component**: `src/app/components/generic-data-table/`
- **Model**: `src/app/models/table-config.model.ts`

---

## Usage Example

### 1. Import the Component

```typescript
import { GenericDataTableComponent } from './components/generic-data-table/generic-data-table.component';
import { TableConfig, TableAction } from './models/table-config.model';
```

### 2. Define Table Configuration

```typescript
export class MyComponent {
  // Data
  sellers: any[] = [];
  totalRecords = 0;
  loading = false;

  // Table Configuration
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
        header: 'Seller Name',
        sortable: true,
        icon: 'pi pi-building',
        iconColor: '#2563EB',
        type: 'icon'
      },
      {
        field: 'email',
        header: 'Email',
        sortable: true
      },
      {
        field: 'status',
        header: 'Status',
        type: 'badge'
      }
    ],
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    globalFilterFields: ['name', 'email'],
    showExport: true,
    showImport: true,
    showSearch: true,
    dataKey: 'id'
  };

  // Actions
  tableActions: TableAction[] = [
    {
      icon: 'pi pi-pencil',
      tooltip: 'Edit',
      callback: (row) => this.editSeller(row),
      styleClass: 'p-button-rounded p-button-text p-button-sm'
    },
    {
      icon: 'pi pi-trash',
      tooltip: 'Delete',
      callback: (row) => this.deleteSeller(row),
      visible: (row) => row.status !== 'active',
      styleClass: 'p-button-rounded p-button-text p-button-sm p-button-danger'
    }
  ];

  editSeller(seller: any) {
    console.log('Edit seller:', seller);
  }

  deleteSeller(seller: any) {
    console.log('Delete seller:', seller);
  }

  onPageChange(event: any) {
    console.log('Page changed:', event);
    // Load data for new page
  }

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  onExport(format: string) {
    console.log('Export as:', format);
    // Implement export logic
  }

  onImport(file: File) {
    console.log('Import file:', file);
    // Implement import logic
  }
}
```

### 3. Use in Template

```html
<app-generic-data-table
  [data]="sellers"
  [config]="tableConfig"
  [actions]="tableActions"
  [loading]="loading"
  [totalRecords]="totalRecords"
  title="Sellers"
  (pageChange)="onPageChange($event)"
  (rowClick)="onRowClick($event)"
  (export)="onExport($event)"
  (import)="onImport($event)"
></app-generic-data-table>
```

---

## Configuration Options

### TableConfig Interface

```typescript
interface TableConfig {
  columns: TableColumn[];           // Column definitions
  paginator?: boolean;              // Enable pagination (default: true)
  rows?: number;                    // Rows per page (default: 10)
  rowsPerPageOptions?: number[];    // Page size options
  globalFilterFields?: string[];    // Fields to search
  exportFilename?: string;          // Export filename
  showExport?: boolean;             // Show export button
  showImport?: boolean;             // Show import button
  showSearch?: boolean;             // Show search box
  selectionMode?: 'single' | 'multiple' | null;  // Row selection
  dataKey?: string;                 // Unique identifier field
}
```

### TableColumn Interface

```typescript
interface TableColumn {
  field: string;                    // Data field name
  header: string;                   // Column header text
  sortable?: boolean;               // Enable sorting
  width?: string;                   // Column width (e.g., '100px', '20%')
  type?: 'text' | 'number' | 'date' | 'badge' | 'icon' | 'custom';
  icon?: string;                    // Icon class (e.g., 'pi pi-user')
  iconColor?: string;               // Icon color
  customTemplate?: string;          // Custom template name
  format?: (value: any) => string;  // Value formatter function
}
```

### TableAction Interface

```typescript
interface TableAction {
  icon: string;                     // Action icon
  tooltip?: string;                 // Tooltip text
  callback: (row: any) => void;     // Click handler
  visible?: (row: any) => boolean;  // Conditional visibility
  styleClass?: string;              // Custom CSS classes
}
```

---

## Column Types

### 1. Text (Default)
```typescript
{
  field: 'name',
  header: 'Name',
  type: 'text'  // or omit type
}
```

### 2. Number
```typescript
{
  field: 'price',
  header: 'Price',
  type: 'number'  // Green color, right-aligned
}
```

### 3. Badge
```typescript
{
  field: 'status',
  header: 'Status',
  type: 'badge'  // Blue badge styling
}
```

### 4. Icon
```typescript
{
  field: 'seller_name',
  header: 'Seller',
  type: 'icon',
  icon: 'pi pi-building',
  iconColor: '#2563EB'
}
```

### 5. Custom Formatter
```typescript
{
  field: 'created_at',
  header: 'Created',
  format: (value) => new Date(value).toLocaleDateString()
}
```

---

## Real-World Examples

### Example 1: Categories Table

```typescript
categoriesConfig: TableConfig = {
  columns: [
    {
      field: 'id',
      header: 'ID',
      sortable: true,
      width: '80px'
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
      header: 'Parent',
      sortable: true
    },
    {
      field: 'item_count',
      header: 'Items',
      type: 'number'
    },
    {
      field: 'status',
      header: 'Status',
      type: 'badge'
    }
  ],
  paginator: true,
  rows: 25,
  showExport: true,
  showSearch: true,
  globalFilterFields: ['name', 'parent_category']
};
```

### Example 2: Sellers/Providers Table

```typescript
sellersConfig: TableConfig = {
  columns: [
    {
      field: 'provider_id',
      header: 'Provider ID',
      sortable: true,
      width: '200px'
    },
    {
      field: 'name',
      header: 'Seller Name',
      sortable: true,
      icon: 'pi pi-building',
      iconColor: '#2563EB',
      type: 'icon'
    },
    {
      field: 'email',
      header: 'Email',
      sortable: true
    },
    {
      field: 'phone',
      header: 'Phone',
      sortable: true
    },
    {
      field: 'city',
      header: 'City',
      sortable: true
    },
    {
      field: 'total_items',
      header: 'Total Items',
      type: 'number'
    }
  ],
  paginator: true,
  rows: 10,
  showExport: true,
  showImport: true,
  showSearch: true,
  globalFilterFields: ['name', 'email', 'city']
};
```

### Example 3: Locations Table

```typescript
locationsConfig: TableConfig = {
  columns: [
    {
      field: 'location_id',
      header: 'Location ID',
      sortable: true,
      width: '200px'
    },
    {
      field: 'name',
      header: 'Location Name',
      sortable: true,
      icon: 'pi pi-map-marker',
      iconColor: '#DC2626',
      type: 'icon'
    },
    {
      field: 'address',
      header: 'Address',
      sortable: false
    },
    {
      field: 'city',
      header: 'City',
      sortable: true
    },
    {
      field: 'state',
      header: 'State',
      sortable: true
    },
    {
      field: 'pincode',
      header: 'Pincode',
      sortable: true
    }
  ],
  paginator: true,
  rows: 10,
  showExport: true,
  showSearch: true,
  globalFilterFields: ['name', 'city', 'state', 'pincode']
};
```

---

## Styling

The component uses the same professional styling as the items table:

- **Header**: Blue background with white text
- **Rows**: Hover effect with light gray background
- **Actions**: Subtle gray buttons with border
- **Badges**: Blue background with rounded corners
- **Numbers**: Green color for emphasis
- **Icons**: Configurable colors

---

## Events

### pageChange
Emitted when page changes
```typescript
onPageChange(event: any) {
  // event.page: Current page (0-indexed)
  // event.rows: Rows per page
}
```

### rowClick
Emitted when row is clicked
```typescript
onRowClick(row: any) {
  // row: Complete row data
}
```

### export
Emitted when export button clicked
```typescript
onExport(format: string) {
  // format: 'csv' or 'excel'
}
```

### import
Emitted when file is selected
```typescript
onImport(file: File) {
  // file: Selected file object
}
```

---

## Best Practices

1. **Always define dataKey** - Use unique identifier field
2. **Limit globalFilterFields** - Only searchable fields
3. **Use appropriate column types** - Better UX and styling
4. **Add icons to important columns** - Visual hierarchy
5. **Implement pagination** - Better performance
6. **Handle loading state** - Show spinner during data fetch
7. **Validate actions visibility** - Conditional action buttons

---

## Next Steps

### Create Pages for:

1. **Categories Page**
   - List all categories with hierarchy
   - Add/Edit/Delete categories
   - Export/Import functionality

2. **Sellers Page**
   - List all sellers/providers
   - View seller details
   - Manage seller status

3. **Locations Page**
   - List all locations
   - View location details
   - Manage location data

---

## File Structure

```
src/app/
├── components/
│   └── generic-data-table/
│       ├── generic-data-table.component.ts
│       ├── generic-data-table.component.html
│       └── generic-data-table.component.scss
├── models/
│   └── table-config.model.ts
└── pages/
    ├── categories-page/
    ├── sellers-page/
    └── locations-page/
```

---

## Summary

✅ **Generic data table component created**  
✅ **Configuration-based approach**  
✅ **Reusable across all pages**  
✅ **Professional styling applied**  
✅ **Icon support added**  
✅ **Export/Import ready**  
✅ **Fully documented**  

The component is production-ready and can be used to quickly build data tables for Categories, Sellers, and Locations pages!
