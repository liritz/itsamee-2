<template>
  <Menubar :model="items" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuItem, Separator } from "@/types/PrimeVue/MenuItem";
import { PrimeIcons } from "primevue/api";
import Menubar from "primevue/menubar";
import { Category } from "@/types/domain/Category";
import { CategoryNode } from "@/types/domain/CategoryNode";
import { Gallery } from "@/types/domain/Gallery";

function itemFromCategory({ title, id }: CategoryNode) {
  return {
    label: title,
    to: `/category/${id}`
  };
}

function itemFromGallery({ title, id }: Gallery) {
  return {
    label: title,
    to: `/gallery/${id}`
  };
}

function createMenuItem({
  id,
  title,
  subcategories,
  galleries
}: CategoryNode): MenuItem | Separator {
  const label = title;
  const to = `/category/${id}`;

  if (subcategories) {
    const all = { label: "Alle", to };
    const separator = { separator: true };
    const links = subcategories.map(itemFromCategory);
    const items = [all, separator, ...links];
    return { label, items };
  }
  if (galleries) {
    const items = galleries.map(itemFromGallery);
    return { label, items };
  }

  const icon = PrimeIcons.ANGLE_DOWN;

  return { label, icon };
}

export default defineComponent({
  name: "MainMenu",
  components: {
    Menubar
  },
  props: {
    categories: { type: Object as PropType<Category[]>, required: true }
  },
  data() {
    return {
      items: this.categories.map(createMenuItem)
    };
  }
});
</script>

<style lang="scss" scoped>
.p-menubar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0;
}
</style>
