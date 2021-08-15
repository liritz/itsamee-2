export interface MenuItem {
  label: string;
  icon?: string;
  to?: string;
  items?: Array<MenuItem | Separator>;
}

export interface Separator {
  separator: boolean;
}
