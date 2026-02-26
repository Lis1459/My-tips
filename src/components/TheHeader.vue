<script>
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
  <header class="header">
    <div class="header__logo"><img src="../assets/Group 1000006015.png" alt="logo" />TipMinder</div>
    <nav class="navigation">
      <RouterLink to="/contracts" class="navigation__item">Contracts</RouterLink>
      <RouterLink to="/details" class="navigation__item">Details</RouterLink>
    </nav>
    <RouterLink to="/login" class="header__log-in">Log in</RouterLink>
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

.header__log-in {
  border-radius: 10px;
  background: var(--background-accent-gradient);
  padding: 15px;
  color: var(--color-buttons);
}
</style>
