export interface FilterField {
  key: string;
  label: string;
  type: 'dropdown' | 'text' | 'date' | 'multiselect' | 'number';
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  dependencies?: string[];
  disabled?: boolean;
  value?: any;
}

export interface FilterConfig {
  filters: FilterField[];
  layout?: 'vertical' | 'horizontal';
  showClearButton?: boolean;
  showApplyButton?: boolean;
}
