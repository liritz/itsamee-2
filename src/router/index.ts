import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CollectionPage from "@/components/CollectionPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:collectionId",
    name: "Collection",
    component: CollectionPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
