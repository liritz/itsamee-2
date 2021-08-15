import { Photo } from "@/types/domain/Photo";

export interface Gallery {
  id: string;
  title: string;
  text: string;
  titlePhoto: Photo;
  photos: Array<Photo>;
}
