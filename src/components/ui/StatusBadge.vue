<script>
export default {
  name: "StatusBadge",
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    statusClass() {
      if (!this.status) return ""
      return `badge-${this.status.toLowerCase()}`
    },
  },
}
</script>

<template>
  <span :class="['badge', statusClass]">{{ status }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 500;
}
.badge-error {
  color: #da3e52;
  background-color: var(--status-error);
}
.badge-active {
  color: #048a81;
  background-color: var(--status-active);
}
.badge-expired {
  color: #d73eda;
  background-color: var(--status-expired);
}
.badge-suspended {
  background-color: var(--status-suspended);
  color: #5f8a04;
}
</style>
