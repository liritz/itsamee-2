import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CategoryView from "@/views/CategoryView.vue";
import GalleryView from "@/views/GalleryView.vue";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/category/:id",
    name: "Category",
    component: CategoryView
  },
  {
    path: "/gallery/:id",
    name: "Gallery",
    component: GalleryView
  },
  {
    path: "/",
    name: "Home",
    component: HomeView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
