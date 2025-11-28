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
  category_name?: string;
  subsubcategory_count?: number;
}

export interface SubSubCategory {
  id: number;
  rozana_id: string;
  name: string;
  subcategory_id: number;
  subcategory_name?: string;
  category_id: number;
  category_name?: string;
  item_count?: number;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}

export interface SubCategoryResponse {
  success: boolean;
  data: SubCategory[];
}

export interface SubSubCategoryResponse {
  success: boolean;
  data: SubSubCategory[];
}
