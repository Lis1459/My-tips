<script>
import BaseButton from "@/components/ui/BaseButton.vue"
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseInput from "@/components/ui/BaseInput.vue"
import BaseSelect from "@/components/ui/BaseSelect.vue"
import { login } from "@/logic/apiService"

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseSelect,
    BaseCard,
  },
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async handleClick(evt) {
      try {
        const responce = login(this.username, this.password)
        if (!responce.ok) {
          console.log(responce)
        }
      } catch (error) {
        console.log(error.message)
      }
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
          <label for="username" class="input-group__label">Username</label>
          <!-- <div> -->
          <BaseInput
            v-model="username"
            placeholder="User"
            name="username"
            id="username"
            autocomplete
            reqired
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
            reqired
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
  width: 100%;
  max-width: 550px;
  padding: 32px 20px;
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
