import { createRouter, createWebHistory } from "vue-router"
import TheDetails from "@/views/TheDetails.vue"
import TheLogin from "@/views/TheLogin.vue"
import AddContractPage from "@/views/AddContractPage.vue"
import store from "@/store"

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
      meta: { requiresAuth: true },
    },
    {
      path: "/details",
      name: "details",
      component: TheDetails,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: TheLogin,
    },
    {
      path: "/add",
      name: "add contract",
      component: AddContractPage,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    return "/login"
  }
  return true
})

export default router
