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
      redirect: "/details",
    },
    {
      path: "/contracts",
      name: "contracts",
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
    {
      path: "/:id/edit",
      name: "edit contract",
      component: AddContractPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
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
