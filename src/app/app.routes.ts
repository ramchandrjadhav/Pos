import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: 'items',
    loadComponent: () => import('./pages/item-list-page/item-list-page.component').then(m => m.ItemListPageComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories-page/categories-page.component').then(m => m.CategoriesPageComponent)
  },
  {
    path: 'sellers',
    loadComponent: () => import('./pages/sellers-page/sellers-page.component').then(m => m.SellersPageComponent)
  },
  {
    path: 'locations',
    loadComponent: () => import('./pages/locations-page/locations-page.component').then(m => m.LocationsPageComponent)
  },
  {
    path: '**',
    redirectTo: 'items'
  }
];
