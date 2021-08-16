<template>
  <div v-if="category">
    <div v-for="gallery in category.galleries" :key="gallery.id">
      {{ gallery.title }}
    </div>
  </div>
  <div v-else>loading</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Category } from "@/types/domain/Category";

export default defineComponent({
  name: "CategoryView",
  computed: {
    category(): Category {
      return this.$store.getters.getCategory(this.$route.params.id);
    }
  }
});
</script>
