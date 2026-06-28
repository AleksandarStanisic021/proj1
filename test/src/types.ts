export interface Element {
  id: number;
  name: string;
}

export type FilterThreshold = 0 | 100 | 2500 | 10000;

export interface SelectWidgetProps {
  elements?: Element[];
  maxSelection?: number;
}

export interface SelectWidgetState {
  saved: Element[];
  draft: Element[];
  isOpen: boolean;
  search: string;
  filter: FilterThreshold;
}
