import { Collection } from "@/types/Flickr/Collection";
import { get } from "@/backend/get";

interface GetTreeResponse {
  collections: { collection: Array<Collection> };
}

export async function getTree(): Promise<Collection> {
  const {
    collections: { collection }
  } = await get<GetTreeResponse>("collections.getTree");

  const TREE_ROOT_TITLE = "Faustball";

  const treeRoot = collection.find(col => col.title === TREE_ROOT_TITLE);
  if (treeRoot) {
    return treeRoot;
  }
  throw new Error(`No Collection found with title '${TREE_ROOT_TITLE}'`);
}
