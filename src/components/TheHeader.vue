<script>
import { mapActions, mapGetters } from "vuex/dist/vuex.cjs.js"
import BaseButton from "./ui/BaseButton.vue"
export default {
  components: {
    BaseButton,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      try {
        this.logout()
        this.$router.push("/login")
      } catch (error) {
        console.error(error.message)
      }
    },
    handleLogin() {
      this.$router.push("/login")
    },
  },
}
</script>

<template>
  <header class="header">
    <div class="header__logo"><img src="../assets/icons/LogoIcon.svg" alt="logo" />TipMinder</div>
    <nav class="navigation">
      <RouterLink to="/contracts" class="navigation__item">Contracts</RouterLink>
      <RouterLink to="/details" class="navigation__item">Details</RouterLink>
    </nav>
    <BaseButton variant="accent" @click="handleLogin" v-if="!isAuthenticated">Log in</BaseButton>
    <BaseButton variant="accent" class="header__log-out" v-else @click="handleLogout"
      >Log out</BaseButton
    >
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

.header__log-out {
  position: relative;
  padding-left: 64px;
}

.header__log-out::before {
  content: url(../assets/icons/ProfileIcon.svg);
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

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 16px;
    gap: 12px;
  }

  .navigation {
    width: 100%;
    justify-content: center;
    gap: 24px;
  }

  .navigation__item {
    padding: 12px 0;
  }
}
</style>
