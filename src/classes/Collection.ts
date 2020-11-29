import { Photoset } from "@/types/Photoset";

export class Collection {
  id: string;
  title: string;
  description: string;
  collection?: Array<Collection>;
  set?: Array<Photoset>;

  constructor(collection: Collection) {
    this.id = collection.id;
    this.title = collection.title;
    this.description = collection.description;
    if (collection.set) {
      this.set = collection.set;
    } else if (collection.collection) {
      this.collection = collection.collection.map(col => new Collection(col));
    } else {
      throw new Error(`cannot create Collection from ${collection}`);
    }
  }
}
