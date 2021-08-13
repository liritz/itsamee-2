import { CategoryNode } from "@/types/domain/CategoryNode";

export interface Content {
  pageTitle: string;
  logoUrl: string;
  categories: Array<CategoryNode>;
}
