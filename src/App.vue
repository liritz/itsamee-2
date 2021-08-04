<template>
  <main-menu />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainMenu from "@/components/MainMenu.vue"

export default defineComponent({
  name: "App",
  components: {
    MainMenu
  }
})
</script>
