export interface Collection {
  id: string;
  title: string;
  description: string;
  iconlarge?: string;
  iconsmall?: string;
  collection?: Collection[];
  set?: Collection[];
}
