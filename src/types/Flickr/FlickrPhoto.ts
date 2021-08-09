export interface FlickrPhoto {
  title: string;
  date_taken: number;
  isprimary: 0 | 1;
  url_o: string;
  height_o?: number;
  width_o?: number;
  url_l?: string;
  height_l?: number;
  width_l?: number;
  url_m: string;
  height_m?: number;
  width_m?: number;
  url_s: string;
  height_s?: number;
  width_s?: number;
}
