import { TextEntry } from "@/types/TextEntry";
import { Photo } from "@/types/Photo";

export interface Photoset {
  id: string;
  owner: string;
  username: string;
  primary: string;
  secret: string;
  count_views: string;
  count_comments: string;
  count_photos: number;
  count_videos: number;
  title: TextEntry;
  description: TextEntry;
  can_comment: number;
  date_create: string;
  date_update: string;
  photos: number;
  videos: number;
  primary_photo_extras?: Photo;
}
