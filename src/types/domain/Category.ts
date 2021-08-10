import { Gallery } from "@/types/domain/Gallery";

export interface Category {
  title: string;
  subcategories?: Array<Category>;
  galleries?: Array<Gallery>;
}
