<template>
  <Menubar :model="items" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Collection } from "@/types/Flickr/Collection";
import { MenuItem } from "@/types/PrimeVue/MenuItem";
import { PrimeIcons } from "primevue/api";
import Menubar from "primevue/menubar";

const menuItemFromCollection = (collection: Collection): MenuItem => {
  const label = collection.title
  
  if (collection.collection) {
    const items = collection.collection.map(col => ({
        label: col.title,
        to: `/collection/${col.id}`
    }));
    return { label, items };
  }

  if (collection.set) {
    const items = collection.set.map(col => ({
        label: col.title, 
        to: `/set/${col.id}`
    }));
    return { label, items };
  }

  const icon = PrimeIcons.ANGLE_DOWN
  const to = `/set/${collection.id}`;

  return { label, to, icon };
};

export default defineComponent({
  name: "MainMenu",
  components: {
    Menubar
  },
  props: {
    collections: { type: Object as PropType<Collection[]>, required: true }
  },
  data() {
    return {
      items: this.collections.map(menuItemFromCollection)
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
