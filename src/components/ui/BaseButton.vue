<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary"].includes(value)
      },
    },
    type: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "reset", "submit"].includes(value)
      },
    },
  },
  emits: ["click"],
  methods: {
    handleClick(evt) {
      this.$emit("click", evt)
    },
  },
  computed: {
    buttonClasses() {
      return ["button", `button-${this.variant}`]
    },
  },
}
</script>
<template>
  <button @click="handleClick" :class="buttonClasses" :type="type">
    <slot></slot>
  </button>
</template>
<style scoped>
.button {
  border-radius: 5px;
  padding: 11.5px 16px;
  cursor: pointer;
}

.button-secondary:hover {
  background-color: var(--color-background-hover);
}

.button-primary:hover {
  background-color: #e67423;
}

.button-primary {
  border: none;
  color: var(--color-buttons);
  background-color: var(--color-accent);
}

.button-secondary {
  color: var(--vt-c-black-soft);
  border: 2px solid var(--vt-c-black-soft);
}

.button-primary:focus {
  outline: 2px solid #bb8a67;
}
</style>
