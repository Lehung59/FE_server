import { createRouter, createWebHistory } from "vue-router";
import admin from "./route-admin.js";
import { useAuthStore } from "../stores/auth.store.js";
const routes = [...admin];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
/**
 * return URL
 * **/
router.beforeEach(async (to, from, next) => {
  // meta title
  document.title = to.meta.title + " - Quản lý dụng cụ đo";
  // check authencicate
    next();
});
export default router;
