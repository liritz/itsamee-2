import { Photoset } from "@/types/Photoset";

export interface PhotosetList {
  photosets: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photoset: Array<Photoset>;
  };
  stat: string;
}
