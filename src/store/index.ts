import { createStore } from "vuex";
import { Content } from "@/types/domain/Content";
import axios from "axios";
import { CategoryNode } from "@/types/domain/CategoryNode";
import { Gallery } from "@/types/domain/Gallery";
import { Category } from "@/types/domain/Category";

function flattenCategoryTree(category: CategoryNode): Array<CategoryNode> {
  if (category.subcategories) {
    return [category, ...category.subcategories.flatMap(flattenCategoryTree)];
  } else {
    return [category];
  }
}

function getCategoryGalleries(category: CategoryNode): Array<Gallery> {
  const galleries = category.galleries ?? [];
  if (category.subcategories) {
    return [
      ...galleries,
      ...category.subcategories.flatMap(getCategoryGalleries)
    ];
  }
  return galleries;
}

function createCategory(categoryNode: CategoryNode): Category {
  return {
    id: categoryNode.id,
    title: categoryNode.title,
    galleries: getCategoryGalleries(categoryNode)
  };
}

function createCategories({ categories }: Content): Array<Category> {
  return categories.flatMap(flattenCategoryTree).map(createCategory);
}

function getGalleries({ categories }: Content): Array<Gallery> {
  return categories
    .flatMap(flattenCategoryTree)
    .flatMap(cat => cat.galleries ?? []);
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
    addCategories(state, content: Content) {
      createCategories(content).forEach(category =>
        state.categories.set(category.id, category)
      );
    },
    addGalleries(state, content: Content) {
      getGalleries(content).forEach(gallery =>
        state.galleries.set(gallery.id, gallery)
      );
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
    getCategory: state => (id: string): Category | undefined => {
      return state.categories.get(id);
    },
    getGallery: state => (id: string): Gallery | undefined => {
      return state.galleries.get(id);
    }
  }
});
