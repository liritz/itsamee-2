import { Category } from "@/types/domain/Category";

export interface Topic {
  title: string;
  categories: Array<Category>;
}
