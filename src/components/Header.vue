<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="header">
    <div class="header__logo"><img src="../assets/Group 1000006015.png" alt="logo" />TipMinder</div>
    <nav class="navigation">
      <RouterLink to="/contracts" class="navigation__item">Contracts</RouterLink>
      <RouterLink to="/details" class="navigation__item">Details</RouterLink>
    </nav>
    <div>log In</div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 32px;
}
.header__logo {
  display: flex;
  align-items: center;
  font-family: Inter;
  gap: 12px;
}

.navigation {
  display: flex;
  align-items: center;
}
.navigation__item {
  padding: 27px 16px;
}
</style>
