export interface Item {
  id: number;
  item_id: string;
  parent_item_id?: string;
  name: string;
  code?: string;
  description?: string;
  short_desc?: string;
  long_desc?: string;
  symbol?: string;
  images?: string[];
  
  // Domain
  domain?: string;
  domain_name?: string;
  
  // Provider/Seller
  provider_id?: string;
  provider_name?: string;
  seller_id?: number;
  seller_name?: string;
  
  // Location
  location_id?: string;
  location_name?: string;
  location_gps?: string;
  city?: string;
  state?: string;
  area_code?: string;
  
  // Category
  category_id?: string;
  rozana_category?: any;
  rozana_sub_category?: any;
  rozana_sub_sub_category?: any;
  rozana_category_id?: number;
  rozana_sub_category_id?: number;
  rozana_sub_sub_category_id?: number;
  rozana_category_name?: string;
  rozana_sub_category_name?: string;
  rozana_sub_sub_category_name?: string;
  
  // Fulfillment
  fulfillment_id?: string;
  
  // Price
  price?: number;
  price_value?: number;
  price_currency?: string;
  price_maximum_value?: number;
  
  // Quantity (API returns these field names)
  quantity?: number;
  quantity_available?: number;
  quantity_maximum?: number;
  quantity_unit?: string;
  quantity_unit_value?: number;
  
  // Legacy field names (for backward compatibility)
  available_quantity?: number;
  quantity_available_count?: number;
  quantity_maximum_count?: number;
  max_allowed_qty?: number;
  quantity_unitized_measure_unit?: string;
  quantity_unitized_measure_value?: number;
  
  // Status flags
  is_active?: boolean;
  is_returnable?: boolean;
  return_window?: string;
  is_cancellable?: boolean;
  available_on_cod?: boolean;
  time_to_ship?: string;
  seller_pickup_return?: boolean;
  contact_details_consumer_care?: string;
  
  // Tags
  tags?: any[];
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
}

export interface ItemListResponse {
  success: boolean;
  data: Item[];
  total: number;
  page: number;
  page_size: number;
}

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
