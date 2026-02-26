<script>
export default {
  name: "Select",
  props: {
    modelValue: {
      type: String,
      reqired: true,
    },
    placeholder: String,
    options: Array,
  },
  emits: ["update:modelValue"],
}
</script>
<template>
  <div class="select-wrapper">
    <select
      class="select"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" selected hidden>{{ placeholder }}</option>
      <option v-for="option in this.options" :value="option.value" :selected="option.isSelected">
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
  /* height: 54px; */
  appearance: none;
  background: none;
  /* background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat, repeat;
  background-position:
    right 0.7em top 50%,
    0 0;
  background-size:
    0.65em auto,
    100%; */
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
