<script>
export default {
  name: "Card",
  props: ["class"],
  computed: {
    cardClasees() {
      return ["card", this.class]
    },
  },
}
</script>
<template>
  <div :class="cardClasees">
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
