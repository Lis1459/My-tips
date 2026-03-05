<script setup>
import { RouterView } from "vue-router"
import TheHeader from "./components/TheHeader.vue"
import TheFooter from "./components/TheFooter.vue"
</script>

<template>
  <TheHeader />
  <main class="main">
    <RouterView />
  </main>
  <TheFooter />
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 144px);
}
</style>
