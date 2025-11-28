import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDataTableComponent } from '../../components/generic-data-table/generic-data-table.component';
import { TableConfig, TableAction } from '../../models/table-config.model';
import { FilterConfig } from '../../models/filter-config.model';
import { MasterDataService } from '../../services/master-data.service';

@Component({
  selector: 'app-sellers-page',
  standalone: true,
  imports: [CommonModule, GenericDataTableComponent],
  templateUrl: './sellers-page.component.html',
  styleUrl: './sellers-page.component.scss'
})
export class SellersPageComponent implements OnInit {
  sellers: any[] = [];
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
        field: 'provider_id',
        header: 'Provider ID',
        sortable: true,
        width: '250px'
      },
      {
        field: 'name',
        header: 'Seller Name',
        sortable: true,
        icon: 'pi pi-building',
        iconColor: '#2563EB',
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
    globalFilterFields: ['name', 'provider_id', 'city', 'state'],
    showExport: true,
    showSearch: false,
    dataKey: 'provider_id'
  };

  tableActions: TableAction[] = [
    {
      icon: 'pi pi-eye',
      callback: (row) => this.viewSeller(row),
      styleClass: 'p-button-rounded p-button-text p-button-sm'
    }
  ];

  constructor(private masterDataService: MasterDataService) {}

  ngOnInit() {
    this.loadSellers();
  }

  loadSellers() {
    this.loading = true;
    this.masterDataService.getSellers().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.sellers = response.data;
          this.totalRecords = response.data.length;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  viewSeller(seller: any) {
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
    this.loadSellers();
  }
}
