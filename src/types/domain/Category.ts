import { Gallery } from "@/types/domain/Gallery";

export interface Category {
  title: string;
  galleries: Array<Gallery>;
}
