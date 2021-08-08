import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { Photoset } from "./types/Flickr/Photoset";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    photosets: Map<string, Photoset>;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
