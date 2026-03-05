<script>
export default {
  name: "BaseSelect",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
    },
    placeholder: String,
    options: {
      type: Array,
    },

    name: String,
  },
  emits: ["update:modelValue"],
}
</script>

<template>
  <div class="select-wrapper">
    <select
      :name="name"
      class="select"
      :value="modelValue || ''"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
      <option disabled value="" hidden>
        {{ placeholder }}
      </option>

      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select {
  padding: 15px 35px 15px 16px;
  border: 2px solid #d5d5d5;
  color: var(--color-input-text);
  border-radius: 10px;
  line-height: 20px;
  appearance: none;
  background: none;
  width: 100%;
}

.select-wrapper {
  position: relative;
  display: inline-block;
}

.select-wrapper::after {
  content: "";
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;

  width: 8px;
  height: 4px;

  background-color: #414141;

  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.select:focus {
  border-color: #b1b1b1;
  outline: none;
}

.select:focus-visible {
  border-color: #b1b1b1;
  outline: none;
}
</style>
