import { Collection } from "@/types/Flickr/Collection";
import { Photoset } from "@/types/Flickr/Photoset";
import axios from "axios";

interface GetTreeResponse {
  collections: { collection: Array<Collection> };
}

interface PhotosetListResponse {
  photosets: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photoset: Array<Photoset>;
  };
}

export const flickr = {
  async get<T>(params: { [key: string]: string }): Promise<T> {
    const { data, status } = await axios.get("/flickr", { params });
    if (status >= 300) {
      throw new Error(`Request failed with status: ${status}`);
    }
    if (data.stat != "ok") {
      throw new Error(`Flickr api responded with status: ${data.stat}`);
    }
    return data as T;
  },

  async getTree(): Promise<Collection> {
    const {
      collections: { collection }
    } = await this.get<GetTreeResponse>({
      method: "collections.getTree"
    });

    const TREE_ROOT_TITLE = "Faustball";

    const treeRoot = collection.find(col => col.title === TREE_ROOT_TITLE);
    if (treeRoot) {
      return treeRoot;
    }
    throw new Error(`No Collection found with title '${TREE_ROOT_TITLE}'`);
  },

  async listPhotosets(): Promise<Array<Photoset>> {
    const {
      photosets: { photoset }
    } = await this.get<PhotosetListResponse>({
      method: "photosets.getList",
      // eslint-disable-next-line @typescript-eslint/camelcase
      primary_photo_extras: "date_taken,original_format,url_m"
    });
    return photoset;
  }
};
