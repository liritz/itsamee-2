import { get } from "@/backend/get";
import { FlickrPhoto } from "@/types/Flickr/FlickrPhoto";

interface PhotosetResponse {
  photoset: {
    id: string;
    primary: string;
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: Array<FlickrPhoto>;
  };
}

export async function getPhotoset(id: string): Promise<Array<FlickrPhoto>> {
  const { photoset } = await get<PhotosetResponse>("photosets.getPhotos", {
    // eslint-disable-next-line @typescript-eslint/camelcase
    photoset_id: id,
    extras: "date_taken,o_dims,url_sq,url_t,url_s,url_m,url_o"
  });
  return photoset.photo;
}
