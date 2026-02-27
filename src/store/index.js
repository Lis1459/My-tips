import { createStore } from "vuex"

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },

    SET_TOKEN(state, token) {
      state.token = token
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
    },
  },

  actions: {
    async login({ commit }, credentials) {
      try {
        const responce = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })
        const data = await responce.json()

        if (!responce.ok) {
          throw new Error(data.message || "Login failed")
        }

        commit("SET_USER", data)
        commit("SET_TOKEN", data.accessToken)

        localStorage.setItem("token", data.accessToken)

        return true
      } catch (error) {
        throw error
      }
    },

    logout({ commit }) {
      commit("LOGOUT")
      localStorage.removeItem("token")
    },
  },
})
