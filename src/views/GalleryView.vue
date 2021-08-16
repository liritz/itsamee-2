<template>
  <div>I am gallery {{ gallery.title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Gallery } from "@/types/domain/Gallery";

export default defineComponent({
  name: "GalleryView",
  computed: {
    gallery(): Gallery {
      return this.$store.getters.getGallery(this.$route.params.id);
    }
  }
});
</script>

<style scoped></style>
