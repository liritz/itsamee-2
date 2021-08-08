<template>
  <p>{{ set.title.text }}</p>
</template>

<script lang="ts">
import { Photoset } from "@/types/Flickr/Photoset";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
    name: "PhotosetPreview",
    props: {
        id: { type: String, required: true }
    },
    computed: {
        ...mapState(["photosets"]),
        set(): Photoset {
            return this.photosets.get(this.id)
        }
    }
})
</script>

<style>

</style>