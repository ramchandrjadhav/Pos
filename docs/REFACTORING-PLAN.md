# Generic Filter Panel Implementation Plan

## Status: IN PROGRESS ⚠️

### Completed ✅
1. Created `generic-filter-panel` component structure
2. Created `filter-config.model.ts` with interfaces

### Next Steps 🚀

#### Phase 1: Implement Generic Filter Panel Component
- [ ] Implement TypeScript logic in `generic-filter-panel.component.ts`
- [ ] Create HTML template with dynamic filter rendering
- [ ] Add professional SCSS styling matching current design
- [ ] Support filter types: dropdown, text, date, multiselect
- [ ] Implement cascading filters (dependencies)
- [ ] Add Clear Filters functionality

#### Phase 2: Update Generic Data Table
- [ ] Add optional filter panel integration
- [ ] Add `@Input() showFilters` property
- [ ] Add `@Input() filterConfig` property
- [ ] Add `@Output() filtersChanged` event
- [ ] Update layout to accommodate filters

#### Phase 3: Refactor Items Page
- [ ] Convert to use generic-data-table + generic-filter-panel
- [ ] Create filter configuration for Items
- [ ] Keep item-detail-modal as is
- [ ] Test all existing functionality

#### Phase 4: Add Filters to Other Pages
- [ ] Add filters to Categories page
- [ ] Add filters to Sellers page
- [ ] Add filters to Locations page

#### Phase 5: Testing with Playwright
- [ ] Test Items page (all features)
- [ ] Test Categories page
- [ ] Test Sellers page
- [ ] Test Locations page
- [ ] Test filter interactions
- [ ] Test pagination
- [ ] Test modals

## Architecture

```
Generic Components Layer:
├── generic-data-table
│   ├── Table rendering
│   ├── Pagination
│   ├── Actions
│   └── Optional filter integration
└── generic-filter-panel
    ├── Dynamic filter fields
    ├── Cascading dropdowns
    └── Clear/Apply actions

Page Layer:
├── Items Page
│   ├── Filter Config (domain, state, city, seller, category)
│   ├── Table Config (11 columns)
│   └── Detail Modal (item-specific)
├── Categories Page
│   ├── Filter Config (parent, status, search)
│   └── Table Config (4 columns)
├── Sellers Page
│   ├── Filter Config (state, city, status, search)
│   └── Table Config (4 columns)
└── Locations Page
    ├── Filter Config (state, city, search)
    └── Table Config (4 columns)
```

## Important Notes

⚠️ **DO NOT BREAK EXISTING FEATURES:**
- Items page filter functionality
- Item detail modal
- Category editing
- Export/Import
- Pagination
- Sorting

## Files to Create/Modify

### New Files:
- ✅ `models/filter-config.model.ts`
- ✅ `components/generic-filter-panel/` (structure created)
- [ ] Complete implementation of generic-filter-panel

### Files to Modify:
- [ ] `components/generic-data-table/generic-data-table.component.ts`
- [ ] `components/generic-data-table/generic-data-table.component.html`
- [ ] `pages/item-list-page/item-list-page.component.ts`
- [ ] `pages/item-list-page/item-list-page.component.html`
- [ ] `pages/categories-page/categories-page.component.ts`
- [ ] `pages/sellers-page/sellers-page.component.ts`
- [ ] `pages/locations-page/locations-page.component.ts`

## Current Session Summary

Due to token limits, this refactoring requires a fresh session to complete. The foundation is laid:
1. Component structure created
2. Models defined
3. Architecture planned
4. Implementation steps documented

**Resume from:** Phase 1 - Implement Generic Filter Panel Component
