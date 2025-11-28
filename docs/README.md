# Rozana ONDC UI - Item Management

Enterprise-grade Angular application for managing ONDC items with Rozana categories.

## Features

✅ **Item Management**
- DataTable with advanced filtering
- Search and pagination
- Export items (CSV/Excel) with filters
- Import items from CSV/Excel
- Inline category editing

✅ **Category Management**
- Three-level hierarchy (Category → SubCategory → SubSubCategory)
- Filter by category at any level
- Search across all levels

✅ **Filters**
- Domain
- State
- City
- Seller/Provider
- Location
- Category hierarchy

✅ **UI/UX**
- ONDC brand colors (Blue #3B82F6, Green #10B981, Orange #F59E0B)
- Responsive sidebar navigation
- Modal popup for item details
- Enterprise-grade design
- PrimeNG components

## Project Structure

```
rozana-ondc-ui/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sidebar-navigation/          # Left sidebar menu
│   │   │   ├── top-header/                  # Top header with logo
│   │   │   ├── item-filter-panel/           # Filter controls
│   │   │   ├── item-data-table/             # Main data table
│   │   │   └── item-detail-modal/           # Edit modal popup
│   │   ├── pages/
│   │   │   └── item-list-page/              # Main items page
│   │   ├── services/
│   │   │   ├── item.service.ts              # Item API calls
│   │   │   ├── category.service.ts          # Category API calls
│   │   │   └── master-data.service.ts       # Master data API calls
│   │   ├── models/
│   │   │   ├── item.model.ts                # Item interface
│   │   │   ├── category.model.ts            # Category interfaces
│   │   │   └── filter.model.ts              # Filter interfaces
│   │   ├── app.component.ts                 # Root component
│   │   ├── app.config.ts                    # App configuration
│   │   └── app.routes.ts                    # Routing configuration
│   ├── styles.scss                          # Global styles with ONDC colors
│   ├── index.html
│   └── main.ts
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd rozana-ondc-ui
npm install
```

### 2. Configure API Endpoint

Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8007/api'
};
```

### 3. Run Development Server

```bash
npm start
```

Navigate to `http://localhost:4200`

### 4. Build for Production

```bash
npm run build
```

Build artifacts will be in `dist/rozana-ondc-ui/`

## API Integration

The application connects to the Rozana ONDC backend APIs:

### Items API
- `GET /api/items` - List items with filters
- `GET /api/items/{id}` - Get item details
- `POST /api/items/bulk-update` - Update categories
- `GET /api/items/export` - Export items
- `POST /api/items/import` - Import items
- `GET /api/items/filters` - Get filter options

### Categories API
- `GET /api/categories` - List categories
- `GET /api/subcategories?category_id={id}` - List subcategories
- `GET /api/subsubcategories?subcategory_id={id}` - List sub-subcategories

### Master Data API
- `GET /api/states` - List states
- `GET /api/cities?state={name}` - List cities
- `GET /api/domains` - List domains
- `GET /api/sellers` - List sellers

## Component Details

### ItemListPageComponent
Main page component that orchestrates the item management interface.

### ItemFilterPanelComponent
Filter controls for:
- Domain dropdown
- State dropdown
- City dropdown (filtered by state)
- Seller dropdown
- Location dropdown
- Category dropdowns (3 levels)
- Search input
- Clear filters button

### ItemDataTableComponent
PrimeNG DataTable with:
- Sortable columns
- Pagination
- Row selection
- Click to open detail modal
- Export button
- Import button

### ItemDetailModalComponent
Modal popup for editing item categories:
- Read-only item details
- Editable category dropdowns (3 levels)
- Cascading category selection
- Save/Cancel buttons

## ONDC Brand Colors

```scss
--ondc-primary: #3B82F6;        // Blue
--ondc-primary-dark: #2563EB;
--ondc-primary-light: #60A5FA;
--ondc-secondary: #10B981;      // Green
--ondc-accent: #F59E0B;         // Orange
--ondc-background: #F8FAFC;
--ondc-surface: #FFFFFF;
--ondc-text-primary: #1E293B;
--ondc-text-secondary: #64748B;
--ondc-border: #E2E8F0;
```

## Technologies Used

- **Angular 17** - Latest standalone components
- **PrimeNG** - Enterprise UI components
- **RxJS** - Reactive programming
- **TypeScript** - Type safety
- **SCSS** - Styling

## Development

### Code Style
- Use standalone components
- Follow Angular style guide
- Use reactive forms
- Implement proper error handling
- Add loading states

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Deployment

### Docker
```bash
docker build -t rozana-ondc-ui .
docker run -p 80:80 rozana-ondc-ui
```

### Nginx
Copy `dist/rozana-ondc-ui/` to nginx web root.

## Support

For issues or questions, contact the Rozana ONDC team.

## License

Proprietary - Rozana ONDC Platform
