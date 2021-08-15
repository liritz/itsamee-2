import { Gallery } from "@/types/domain/Gallery";

export interface CategoryNode {
  id: string;
  title: string;
  subcategories?: Array<CategoryNode>;
  galleries?: Array<Gallery>;
}
