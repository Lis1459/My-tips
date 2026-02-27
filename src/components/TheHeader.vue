<script>
import store from "@/store"
import { RouterLink, RouterView } from "vue-router"
export default {
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated
    },
  },
  methods: {
    handleLogout(evt) {
      try {
        store.dispatch("logout")
      } catch (error) {
        console.log(error.message)
      }
    },
  },
}
</script>

<template>
  <header class="header">
    <div class="header__logo"><img src="../assets/logo.svg" alt="logo" />TipMinder</div>
    <nav class="navigation">
      <RouterLink to="/contracts" class="navigation__item">Contracts</RouterLink>
      <RouterLink to="/details" class="navigation__item">Details</RouterLink>
    </nav>
    <RouterLink to="/login" class="header__button" v-if="!isAuthenticated">Log in</RouterLink>
    <button class="header__button header__log-out" v-else @click="handleLogout">Log out</button>
    <!-- <button class="header__button header__log-out" v-else>Log out</button> -->
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background-header);
  padding: 0px 32px;
  border-bottom: 1px solid #c0c0c0;
  height: 72px;
}
.header__logo {
  display: flex;
  align-items: center;
  font-family: "Inter", sans-serif;
  font-weight: var(--weight-semi-bold);
  gap: 12px;
  color: var(--color-logo);
}

.navigation {
  display: flex;
  align-items: center;
}
.navigation__item {
  padding: 27px 16px;
}

.header__button {
  position: relative;
  cursor: pointer;
  line-height: 18px;
  border: none;
  border-radius: 10px;
  background: var(--background-accent-gradient);
  padding: 15px 16px;
  color: var(--color-buttons);
}

.header__log-out {
  padding-left: 64px;
}

.header__log-out::before {
  content: url(../assets/profile.svg);
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.header__log-out::after {
  content: "";
  position: absolute;
  border: 1px solid #ffdac5;
  right: 88px;
  height: 48px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
