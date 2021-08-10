<template>
  <main-menu v-if="treeRoot" :collections="treeRoot.collection" />
  <Toast />
  <div class="page-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainMenu from "@/components/MainMenu.vue";
import Toast from "primevue/toast";
import { Collection } from "./types/Flickr/Collection";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    Toast,
    MainMenu
  },
  data() {
    return {
      treeRoot: null as Collection | null
    };
  },
  created() {
    this.loadContent();
  },
  methods: mapActions(["loadContent"]),
  computed: mapState(["content"])
});
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 50px;
}
</style>
