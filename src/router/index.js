import { createRouter, createWebHistory } from "vue-router"
import Details from "@/views/Details.vue"
import Login from "@/views/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Details,
    },
    {
      path: "/contracts",
      name: "contracts",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Contracts.vue"),
    },
    {
      path: "/details",
      name: "details",
      component: Details,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
})

export default router
