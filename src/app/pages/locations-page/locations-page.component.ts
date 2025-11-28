import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDataTableComponent } from '../../components/generic-data-table/generic-data-table.component';
import { TableConfig, TableAction } from '../../models/table-config.model';
import { FilterConfig } from '../../models/filter-config.model';

@Component({
  selector: 'app-locations-page',
  standalone: true,
  imports: [CommonModule, GenericDataTableComponent],
  templateUrl: './locations-page.component.html',
  styleUrl: './locations-page.component.scss'
})
export class LocationsPageComponent {
  locations: any[] = [];
  totalRecords = 0;
  loading = false;
  currentFilters: any = {};

  filterConfig: FilterConfig = {
    filters: [
      {
        key: 'status',
        label: 'Status',
        type: 'dropdown',
        options: [
          { name: 'Active', code: 'active' },
          { name: 'Inactive', code: 'inactive' }
        ],
        placeholder: 'Select Status'
      }
    ],
    showClearButton: true
  };

  tableConfig: TableConfig = {
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
        field: 'city',
        header: 'City',
        sortable: true
      },
      {
        field: 'state',
        header: 'State',
        sortable: true
      }
    ],
    paginator: true,
    rows: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    globalFilterFields: ['name', 'location_id', 'city', 'state'],
    showExport: true,
    showSearch: false,
    dataKey: 'location_id'
  };

  tableActions: TableAction[] = [
    {
      icon: 'pi pi-eye',
      callback: (row) => this.viewLocation(row),
      styleClass: 'p-button-rounded p-button-text p-button-sm'
    }
  ];

  viewLocation(location: any) {
  }

  onPageChange(event: { page: number; page_size: number }) {
    // TODO: Implement server-side pagination if needed
  }

  onRowClick(row: any) {
  }

  onExport(format: string) {
  }

  onFiltersChanged(filters: any) {
    this.currentFilters = filters;
  }
}
