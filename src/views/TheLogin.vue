<script>
import BaseButton from "@/components/ui/BaseButton.vue"
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseInput from "@/components/ui/BaseInput.vue"
import BaseSelect from "@/components/ui/BaseSelect.vue"

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseSelect,
    BaseCard,
  },
  data() {
    return {
      email: "",
      password: "",
      options: [
        { value: "nigga", label: "Nigger", isSelected: true },
        { value: "putin", label: "Vova", isSelected: false },
      ],
    }
  },
  methods: {
    handleClick(evt) {
      console.log("clicked ")
    },
  },
}
</script>
<template>
  <div class="login">
    <h1 class="login__header">Log In</h1>
    <BaseCard>
      <form @submit.prevent="handleClick" class="form">
        <div class="form__input-group">
          <label for="email" class="input-group__label">Email</label>
          <!-- <div> -->
          <BaseInput
            v-model="email"
            placeholder="example@gmail.com"
            name="email"
            type="email"
            id="email"
            autocomplete
          />
          <!-- </div> -->
        </div>
        <div class="form__input-group">
          <label for="password" class="input-group__label">Password</label>
          <!-- <div> -->
          <BaseInput
            v-model="password"
            placeholder="**********"
            name="password"
            type="password"
            id="password"
            autocomplete
          />
          <!-- </div> -->
        </div>
        <BaseButton type="submit">Submit</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped>
.login {
  width: fit-content;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.login__header {
  font-size: 30px;
  line-height: 45px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form__input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* .input-group__label {
  font-size: 14px;
} */
</style>
