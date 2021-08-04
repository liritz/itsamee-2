<template>
  <mega-menu :model="items" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MegaMenu from "primevue/megamenu"

export default defineComponent({
    name: "MainMenu",
    components: {
        MegaMenu
    },
    data() {
        return {
            items: [
                {
                    label: "Gallery",
                    to: "/1234"
                }
            ]
        }
    }
});
</script>

<style>

</style>