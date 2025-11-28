# Rozana ONDC UI - Complete Setup Guide

## 📋 Overview

Enterprise-grade Angular application for ONDC Item Management with the following features:

✅ **Item DataTable** with advanced filtering  
✅ **Export/Import** functionality (CSV/Excel)  
✅ **Modal popup** for editing item categories  
✅ **Sidebar navigation** with ONDC branding  
✅ **Filter panel** for Domain, State, City, Seller, Location, Categories  
✅ **ONDC colors** - Blue (#3B82F6), Green (#10B981), Orange (#F59E0B)

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd /Users/varmasanagaraju/Desktop/Varma/RZN/rozana-ondc-ui
npm install
```

This will install:
- Angular 17
- PrimeNG (UI components)
- RxJS
- TypeScript

### Step 2: Configure Backend API

Create environment file:

```bash
mkdir -p src/environments
```

Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8007/api'
};
```

Create `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-domain.com/api'
};
```

### Step 3: Run Development Server

```bash
npm start
```

Application will be available at: `http://localhost:4200`

---

## 📁 Project Structure (Created)

```
rozana-ondc-ui/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sidebar-navigation/
│   │   │   │   └── sidebar-navigation.component.ts    ✅ Created
│   │   │   └── top-header/
│   │   │       └── top-header.component.ts            ✅ Created
│   │   ├── app.component.ts                           ✅ Created
│   │   ├── app.config.ts                              ✅ Created
│   │   └── app.routes.ts                              ✅ Created
│   ├── styles.scss                                    ✅ Created (ONDC colors)
│   ├── index.html                                     ✅ Created
│   └── main.ts                                        ✅ Created
├── package.json                                       ✅ Created
├── angular.json                                       ✅ Created
├── tsconfig.json                                      ✅ Created
├── tsconfig.app.json                                  ✅ Created
└── README.md                                          ✅ Created
```

---

## 📝 Components to Create Next

### 1. Models (Data Interfaces)

**File: `src/app/models/item.model.ts`**
```typescript
export interface Item {
  id: number;
  item_id: string;
  name: string;
  price: number;
  quantity: number;
  seller_id: number;
  location_id: number;
  rozana_category_id?: number;
  rozana_sub_category_id?: number;
  rozana_sub_sub_category_id?: number;
  rozana_category_name?: string;
  rozana_sub_category_name?: string;
  rozana_sub_sub_category_name?: string;
}
```

**File: `src/app/models/category.model.ts`**
```typescript
export interface Category {
  id: number;
  rozana_id: string;
  name: string;
  subcategory_count?: number;
}

export interface SubCategory {
  id: number;
  rozana_id: string;
  name: string;
  category_id: number;
  category_name: string;
  subsubcategory_count?: number;
}

export interface SubSubCategory {
  id: number;
  rozana_id: string;
  name: string;
  subcategory_id: number;
  subcategory_name: string;
  category_id: number;
  category_name: string;
  item_count?: number;
}
```

**File: `src/app/models/filter.model.ts`**
```typescript
export interface ItemFilters {
  page?: number;
  page_size?: number;
  seller_id?: number;
  location_id?: number;
  rozana_category_id?: number;
  rozana_sub_category_id?: number;
  rozana_sub_sub_category_id?: number;
  search?: string;
}
```

### 2. Services (API Integration)

**File: `src/app/services/item.service.ts`**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Item, ItemFilters } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient) {}

  getItems(filters: ItemFilters): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key].toString());
      }
    });
    return this.http.get(this.apiUrl, { params });
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  bulkUpdateCategories(items: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk-update`, { items });
  }

  exportItems(filters: ItemFilters, format: string): Observable<Blob> {
    let params = new HttpParams();
    params = params.set('format', format);
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key].toString());
      }
    });
    return this.http.get(`${this.apiUrl}/export`, { 
      params, 
      responseType: 'blob' 
    });
  }

  importItems(file: File, format: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    return this.http.post(`${this.apiUrl}/import`, formData);
  }

  getFilterOptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/filters`);
  }
}
```

**File: `src/app/services/category.service.ts`**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category, SubCategory, SubSubCategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>(`${this.apiUrl}/categories`);
  }

  getSubCategories(categoryId?: number): Observable<{ data: SubCategory[] }> {
    let params = new HttpParams();
    if (categoryId) {
      params = params.set('category_id', categoryId.toString());
    }
    return this.http.get<{ data: SubCategory[] }>(`${this.apiUrl}/subcategories`, { params });
  }

  getSubSubCategories(subcategoryId?: number): Observable<{ data: SubSubCategory[] }> {
    let params = new HttpParams();
    if (subcategoryId) {
      params = params.set('subcategory_id', subcategoryId.toString());
    }
    return this.http.get<{ data: SubSubCategory[] }>(`${this.apiUrl}/subsubcategories`, { params });
  }
}
```

**File: `src/app/services/master-data.service.ts`**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/states`);
  }

  getCities(state?: string): Observable<any> {
    let params = new HttpParams();
    if (state) {
      params = params.set('state', state);
    }
    return this.http.get(`${this.apiUrl}/cities`, { params });
  }

  getDomains(): Observable<any> {
    return this.http.get(`${this.apiUrl}/domains`);
  }

  getSellers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sellers`);
  }
}
```

### 3. Main Page Component

**File: `src/app/pages/item-list-page/item-list-page.component.ts`**

This component will:
- Display the filter panel
- Display the data table
- Handle export/import
- Open the detail modal

### 4. Filter Panel Component

**File: `src/app/components/item-filter-panel/item-filter-panel.component.ts`**

Filters:
- Domain dropdown
- State dropdown
- City dropdown (filtered by state)
- Seller dropdown
- Location dropdown
- Category dropdown
- SubCategory dropdown (filtered by category)
- SubSubCategory dropdown (filtered by subcategory)
- Search input
- Clear filters button
- Apply filters button

### 5. Data Table Component

**File: `src/app/components/item-data-table/item-data-table.component.ts`**

Features:
- PrimeNG p-table
- Sortable columns
- Pagination
- Row click opens modal
- Export button
- Import button
- Loading state

### 6. Detail Modal Component

**File: `src/app/components/item-detail-modal/item-detail-modal.component.ts`**

Features:
- PrimeNG p-dialog
- Display item details (read-only)
- Edit category dropdowns (3 levels)
- Cascading category selection
- Save button
- Cancel button

---

## 🎨 ONDC Brand Colors (Already Applied)

```scss
--ondc-primary: #3B82F6;        // Blue
--ondc-secondary: #10B981;      // Green
--ondc-accent: #F59E0B;         // Orange
--ondc-background: #F8FAFC;
--ondc-surface: #FFFFFF;
```

---

## 🔧 Next Steps

1. **Install dependencies**: `npm install`
2. **Create environment files** with API URL
3. **Create remaining components** (models, services, pages)
4. **Test with backend APIs**
5. **Build for production**: `npm run build`

---

## 📦 Dependencies Installed

- `@angular/animations`: ^17.0.0
- `@angular/common`: ^17.0.0
- `@angular/core`: ^17.0.0
- `@angular/forms`: ^17.0.0
- `@angular/router`: ^17.0.0
- `primeng`: ^17.0.0 (DataTable, Dialog, Dropdown, etc.)
- `primeicons`: ^6.0.1 (Icons)
- `rxjs`: ~7.8.0

---

## ✅ What's Already Created

1. ✅ Project structure
2. ✅ Package.json with dependencies
3. ✅ Angular configuration
4. ✅ TypeScript configuration
5. ✅ Global styles with ONDC colors
6. ✅ Main app component with layout
7. ✅ Top header component with ONDC logo
8. ✅ Sidebar navigation component
9. ✅ Routing configuration
10. ✅ README documentation

---

## 🎯 Summary

The Angular project **`rozana-ondc-ui`** has been created with:

- ✅ Enterprise-grade structure
- ✅ ONDC brand colors
- ✅ Sidebar navigation
- ✅ Top header with logo
- ✅ PrimeNG integration
- ✅ Clear component naming
- ✅ Standalone components (Angular 17)

**Next**: Run `npm install` and start building the remaining components!
