import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../core/services/base-http.service';
import { API_ENDPOINTS } from '../core/config/api-endpoints.config';
import { Item, ItemListResponse, ItemFilters } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseHttpService {
  getItems(filters: ItemFilters): Observable<ItemListResponse> {
    console.log('ItemService: getItems called', filters);
    return this.get<ItemListResponse>(API_ENDPOINTS.ITEMS.BASE, filters);
  }

  getItemById(id: number): Observable<{ success: boolean; data: Item }> {
    console.log('ItemService: getItemById called', id);
    return this.get<{ success: boolean; data: Item }>(API_ENDPOINTS.ITEMS.BY_ID(id));
  }

  bulkUpdateCategories(items: any[]): Observable<any> {
    console.log('ItemService: bulkUpdateCategories called', items);
    return this.post(API_ENDPOINTS.ITEMS.BULK_UPDATE, { items });
  }

  exportItems(filters: ItemFilters, format: string): Observable<Blob> {
    console.log('ItemService: exportItems called', { filters, format });
    return this.getBlob(API_ENDPOINTS.ITEMS.EXPORT, { ...filters, format });
  }

  importItems(file: File, format: string): Observable<any> {
    console.log('ItemService: importItems called', { fileName: file.name, format });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    return this.postFormData(API_ENDPOINTS.ITEMS.IMPORT, formData);
  }

  getFilterOptions(): Observable<any> {
    console.log('ItemService: getFilterOptions called');
    return this.get(API_ENDPOINTS.ITEMS.FILTERS);
  }
}
