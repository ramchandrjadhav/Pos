export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'badge' | 'icon' | 'custom';
  icon?: string;
  iconColor?: string;
  customTemplate?: string;
  format?: (row: any) => string;
}

export interface TableConfig {
  columns: TableColumn[];
  paginator?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  globalFilterFields?: string[];
  exportFilename?: string;
  showExport?: boolean;
  showImport?: boolean;
  showSearch?: boolean;
  selectionMode?: 'single' | 'multiple' | null;
  dataKey?: string;
}

export interface TableAction {
  icon: string;
  tooltip?: string;
  callback: (row: any) => void;
  visible?: (row: any) => boolean;
  styleClass?: string;
}
