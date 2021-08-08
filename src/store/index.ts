import { flickr } from "@/api/flickr";
import { Photoset } from "@/types/Flickr/Photoset";
import { createStore } from "vuex";

export default createStore({
  state: {
      photosets: new Map<string, Photoset>()
  },
  mutations: {
    addPhotoset(state, photoset: Photoset) {
      state.photosets.set(photoset.id, photoset)
    }
  },
  actions: {
    async loadPhotosets(context) {
      flickr.listPhotosets().then(
        list => list.forEach(
          set => context.commit("addPhotoset", set)
        )
      )
    }
  }
});
