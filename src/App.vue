<template>
  <main-menu v-if="treeRoot" :collections="treeRoot.collection" />
  <Toast />
  <div class="page-container">
    <router-view />
  </div>
  <photoset-preview v-for="set in photosets.values()" :key="set.id" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { flickr } from "@/api/flickr";
import MainMenu from "@/components/MainMenu.vue";
import PhotosetPreview from "@/components/PhotosetPreview.vue";
import Toast from "primevue/toast";
import { Collection } from "./types/Flickr/Collection";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    Toast,
    MainMenu,
    PhotosetPreview
  },
  data() {
    return {
      treeRoot: null as Collection | null
    };
  },
  created() {
    this.loadPhotosets();
    flickr.getTree().then(tree => (this.treeRoot = tree));
  },
  methods: mapActions(["loadPhotosets"]),
  computed: mapState(["photosets"])
});
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 50px;
}
</style>
