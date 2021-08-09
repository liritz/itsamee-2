import { Photoset } from "@/types/Flickr/Photoset";
import { get } from "@/backend/get";

interface PhotosetListResponse {
  photosets: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photoset: Array<Photoset>;
  };
}

export async function listPhotosets(): Promise<Array<Photoset>> {
  const {
    photosets: { photoset }
  } = await get<PhotosetListResponse>("photosets.getList", {
    // eslint-disable-next-line @typescript-eslint/camelcase
    primary_photo_extras: "date_taken,original_format,url_m"
  });
  return photoset;
}
