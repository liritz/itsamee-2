import { createStore } from "vuex";
import { Content } from "@/types/domain/Content";
import axios from "axios";
import { Category } from "@/types/domain/Category";
import { Gallery } from "@/types/domain/Gallery";

function flattenCategoryTree(category: Category): Array<Category> {
  if (category.subcategories) {
    return [category, ...category.subcategories.flatMap(flattenCategoryTree)];
  } else {
    return [category];
  }
}

function getCategoryGalleries(category: Category): Array<Gallery> {
  const galleries = category.galleries ?? [];
  if (category.subcategories) {
    return [
      ...galleries,
      ...category.subcategories.flatMap(getCategoryGalleries)
    ];
  }
  return galleries;
}

function addGalleries(category: Category): Category {
  const { title, subcategories } = category;
  const galleries = getCategoryGalleries(category);
  return { title, subcategories, galleries };
}

function getGalleries({ galleries }: Category): Array<Gallery> {
  return galleries ?? [];
}

export default createStore({
  state: {
    content: null as Content | null,
    categories: new Map<string, Category>(),
    galleries: new Map<string, Gallery>()
  },
  mutations: {
    addContent(state, content: Content) {
      state.content = content;
    },
    addCategories(state, { categories }: Content) {
      categories
        .flatMap(flattenCategoryTree)
        .map(addGalleries)
        .forEach(category => state.categories.set(category.title, category));
    },
    addGalleries(state, { categories }: Content) {
      categories
        .flatMap(flattenCategoryTree)
        .flatMap(getGalleries)
        .forEach(gallery => state.galleries.set(gallery.title, gallery));
    }
  },
  actions: {
    async loadContent({ commit }) {
      const { statusText, data } = await axios.get<Content>("/content");
      if (statusText.toLowerCase() === "ok") {
        commit("addContent", data);
        commit("addCategories", data);
        commit("addGalleries", data);
      }
    }
  },
  getters: {
    getCategory: state => (title: string): Category | undefined => {
      return state.categories.get(title);
    }
  }
});
