export const API_ENDPOINTS = {
  ITEMS: {
    BASE: '/items',
    BY_ID: (id: number) => `/items/${id}`,
    BULK_UPDATE: '/items/bulk-update',
    EXPORT: '/items/export',
    IMPORT: '/items/import',
    FILTERS: '/items/filters'
  },
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: number) => `/categories/${id}`,
    EXPORT: '/categories/export'
  },
  SUBCATEGORIES: {
    BASE: '/subcategories',
    BY_ID: (id: number) => `/subcategories/${id}`
  },
  SUBSUBCATEGORIES: {
    BASE: '/subsubcategories',
    BY_ID: (id: number) => `/subsubcategories/${id}`
  },
  MASTER_DATA: {
    STATES: '/states',
    CITIES: '/cities',
    DOMAINS: '/domains',
    SELLERS: '/sellers'
  }
} as const;
