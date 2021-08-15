<template>
  <main-menu v-if="categories" :categories="categories" />
  <Toast />
  <div class="page-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainMenu from "@/components/MainMenu.vue";
import Toast from "primevue/toast";
import { CategoryNode } from "@/types/domain/CategoryNode";

export default defineComponent({
  name: "App",
  components: {
    Toast,
    MainMenu
  },
  created() {
    this.$store.dispatch("loadContent");
  },
  computed: {
    categories(): Array<CategoryNode> | undefined {
      return this.$store.state.content?.categories;
    }
  }
});
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 50px;
}
</style>
