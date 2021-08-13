import { Gallery } from "@/types/domain/Gallery";

export interface CategoryNode {
  title: string;
  subcategories?: Array<CategoryNode>;
  galleries?: Array<Gallery>;
}
