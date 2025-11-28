import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../core/services/base-http.service';
import { API_ENDPOINTS } from '../core/config/api-endpoints.config';
import { 
  Category, 
  SubCategory, 
  SubSubCategory,
  CategoryResponse,
  SubCategoryResponse,
  SubSubCategoryResponse
} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseHttpService {
  getCategories(): Observable<CategoryResponse> {
    console.log('CategoryService: getCategories called');
    return this.get<CategoryResponse>(API_ENDPOINTS.CATEGORIES.BASE);
  }

  getCategoryById(id: number): Observable<{ success: boolean; data: Category }> {
    console.log('CategoryService: getCategoryById called', id);
    return this.get<{ success: boolean; data: Category }>(API_ENDPOINTS.CATEGORIES.BY_ID(id));
  }

  getSubCategories(categoryId?: number, search?: string): Observable<SubCategoryResponse> {
    console.log('CategoryService: getSubCategories called', { categoryId, search });
    return this.get<SubCategoryResponse>(API_ENDPOINTS.SUBCATEGORIES.BASE, {
      category_id: categoryId,
      search
    });
  }

  getSubCategoryById(id: number): Observable<{ success: boolean; data: SubCategory }> {
    console.log('CategoryService: getSubCategoryById called', id);
    return this.get<{ success: boolean; data: SubCategory }>(API_ENDPOINTS.SUBCATEGORIES.BY_ID(id));
  }

  getSubSubCategories(categoryId?: number, subcategoryId?: number, search?: string): Observable<SubSubCategoryResponse> {
    console.log('CategoryService: getSubSubCategories called', { categoryId, subcategoryId, search });
    return this.get<SubSubCategoryResponse>(API_ENDPOINTS.SUBSUBCATEGORIES.BASE, {
      category_id: categoryId,
      subcategory_id: subcategoryId,
      search
    });
  }

  getSubSubCategoryById(id: number): Observable<{ success: boolean; data: SubSubCategory }> {
    console.log('CategoryService: getSubSubCategoryById called', id);
    return this.get<{ success: boolean; data: SubSubCategory }>(API_ENDPOINTS.SUBSUBCATEGORIES.BY_ID(id));
  }
}
