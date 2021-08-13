import { createStore } from "vuex";
import { Content } from "@/types/domain/Content";
import axios from "axios";
import { Category } from "@/types/domain/Category";

function flattenCategoryTree(category: Category): Array<Category> {
  if (category.subcategories) {
    return [category, ...category.subcategories.flatMap(flattenCategoryTree)];
  } else {
    return [category];
  }
}

export default createStore({
  state: {
    content: null as Content | null,
    categories: new Map<string, Category>()
  },
  mutations: {
    addContent(state, content: Content) {
      state.content = content;
    },
    addCategory(state, category: Category) {
      state.categories.set(category.title, category);
    }
  },
  actions: {
    async loadContent({ commit }) {
      const { statusText, data } = await axios.get<Content>("/content");
      if (statusText.toLowerCase() === "ok") {
        commit("addContent", data);
        data.categories
          .flatMap(flattenCategoryTree)
          .forEach(cat => commit("addCategory", cat));
      }
    }
  },
  getters: {
    getCategory: state => (title: string): Category | undefined => {
      return state.categories.get(title);
    }
  }
});
