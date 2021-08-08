<template>
  <div>I'm collection {{ collectionId }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CollectionPage",
  data() {
    return {
      collectionId: this.$route.params.collectionId
    };
  }
});
</script>
