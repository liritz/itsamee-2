import { Content } from "@/types/domain/Content";
import { Collection } from "@/types/Flickr/Collection";
import { Topic } from "@/types/domain/Topic";
import { Category } from "@/types/domain/Category";
import { Gallery } from "@/types/domain/Gallery";
import { getPhotoset } from "@/backend/getPhotoset";
import { FlickrPhoto } from "@/types/Flickr/FlickrPhoto";
import { Photo } from "@/types/domain/Photo";
import { toDate } from "date-fns";

function createPhoto({
  title,
  // eslint-disable-next-line @typescript-eslint/camelcase
  date_taken,
  // eslint-disable-next-line @typescript-eslint/camelcase
  url_m,
  // eslint-disable-next-line @typescript-eslint/camelcase
  url_o,
  // eslint-disable-next-line @typescript-eslint/camelcase
  url_s,
  isprimary
}: FlickrPhoto): Photo {
  return {
    title: title,
    date: toDate(date_taken),
    isPrimary: !!isprimary,
    // eslint-disable-next-line @typescript-eslint/camelcase
    url: { medium: url_m, original: url_o, small: url_s }
  };
}

async function createGallery({
  id,
  title,
  description
}: Collection): Promise<Gallery> {
  const photos = (await getPhotoset(id)).map(createPhoto);
  const titlePhoto = photos.find(p => p.isPrimary);
  if (!titlePhoto) {
    throw new Error(`Missing title photo in collection with id '${id}'`);
  }
  return {
    title: title,
    text: description,
    photos,
    titlePhoto
  };
}

async function createCategory({ title, set }: Collection): Promise<Category> {
  const galleries = await Promise.all(set?.map(createGallery) ?? []);
  return {
    title,
    galleries
  };
}

async function createTopic({ title, collection }: Collection): Promise<Topic> {
  const categories = await Promise.all(collection?.map(createCategory) ?? []);
  return {
    title,
    categories
  };
}

export async function createContent({
  title,
  collection
}: Collection): Promise<Content> {
  const topics = await Promise.all(collection?.map(createTopic) ?? []);
  return {
    pageTitle: title,
    logoUrl: process.env.LOGO_URL,
    topics
  };
}
