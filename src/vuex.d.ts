import { Store } from "vuex";
import { Content } from "@/types/domain/Content";
import { Category } from "@/types/domain/Category";
import { Gallery } from "@/types/domain/Gallery";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    content: Content | null;
    categories: Map<string, Category>;
    galleries: Map<string, Gallery>;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
