import { createStore } from "vuex";
import { Content } from "@/types/domain/Content";
import axios from "axios";

export default createStore({
  state: {
    content: null as Content | null
  },
  mutations: {
    addContent(state, content: Content) {
      state.content = content;
    }
  },
  actions: {
    async loadContent({ commit }) {
      const { statusText, data } = await axios.get("/content");
      if (statusText.toLowerCase() === "ok") {
        commit("addContent", data);
      }
    }
  }
});
