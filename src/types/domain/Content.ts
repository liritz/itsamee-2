import { Category } from "@/types/domain/Category";

export interface Content {
  pageTitle: string;
  logoUrl: string;
  categories: Array<Category>;
}
