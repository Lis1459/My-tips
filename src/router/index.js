import { createRouter, createWebHistory } from "vue-router"
import TheDetails from "@/views/TheDetails.vue"
import TheLogin from "@/views/TheLogin.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TheDetails,
    },
    {
      path: "/contracts",
      name: "contracts",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/TheContracts.vue"),
    },
    {
      path: "/details",
      name: "details",
      component: TheDetails,
    },
    {
      path: "/login",
      name: "login",
      component: TheLogin,
    },
  ],
})

export default router
