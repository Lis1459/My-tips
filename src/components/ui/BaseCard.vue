<script>
export default {
  name: "BaseCard",
}
</script>
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<style scoped>
.card {
  background-color: var(--color-background-card);
  color: #414141;
  border: 2px solid var(--color-border-card);
  border-radius: 10px;
  padding: 32px;
}
</style>
