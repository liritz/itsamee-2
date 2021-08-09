import axios from "axios";
import { createFlickrConfig } from "@/backend/createFlickrConfig";

export async function get<T>(
  method: string,
  params?: { [key: string]: string }
): Promise<T> {
  const { data, status } = await axios.get(
    process.env.FLICKR_URL,
    createFlickrConfig(method, params)
  );
  if (status >= 300) {
    throw new Error(`Request failed with status: ${status}`);
  }
  const unpacked = await JSON.parse(data);
  if (unpacked.stat != "ok") {
    throw new Error(`Flickr api responded with status: ${data.stat}`);
  }
  return unpacked as T;
}
