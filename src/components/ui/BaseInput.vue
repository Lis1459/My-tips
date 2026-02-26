<script>
export default {
  name: "Input",
  props: {
    autocomplete: {
      type: Boolean,
    },
    modelValue: {
      type: String,
      reqired: true,
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "email", "password"].includes(value)
      },
    },
    name: String,
    placeholder: String,
  },
  emits: ["update:modelValue"],
  computed: {
    isAutocomplete() {
      return this.autocomplete ? "on" : "off"
    },
  },
}
</script>
<template>
  <input
    :name="name"
    :type="type"
    class="input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :autocomplete="isAutocomplete"
  />
</template>

<style scoped>
.input {
  color: var(--color-input-text);
  padding: 15px 16px;
  border: 2px solid #d5d5d5;
  border-radius: 10px;
  line-height: 20px;
}

.input:focus {
  border-color: #b1b1b1;
}

.input:focus-visible {
  border-color: #b1b1b1;
}
</style>
