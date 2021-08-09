import { Photo } from "@/types/domain/Photo";

export interface Gallery {
  title: string;
  text: string;
  titlePhoto: Photo;
  photos: Array<Photo>;
}
