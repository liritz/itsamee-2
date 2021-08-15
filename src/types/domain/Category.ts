import { Gallery } from "@/types/domain/Gallery";

export interface Category {
  id: string;
  title: string;
  galleries: Array<Gallery>;
}
