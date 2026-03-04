import { createStore } from "vuex"

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
    contracts: [],
    tips: [],
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getContracts: (state) => state.contracts || [],
    getTips: (state) => state.tips || [],
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },

    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_CONTRACTS(state, contracts) {
      state.contracts = contracts
    },
    SET_TIPS(state, tips) {
      state.tips = tips
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

    async fetchContracts({ commit }) {
      try {
        const response = await fetch("https://dummyjson.com/c/61ad-93ce-4b06-8288")
        const data = await response.json()
        commit("SET_CONTRACTS", data.contracts || [])
      } catch (error) {
        console.error("Failed to load contracts", error)
        commit("SET_CONTRACTS", [])
      }
    },
    async fetchTips({ commit }) {
      try {
        const response = await fetch("https://dummyjson.com/c/3ca5-640a-46bf-b4b5")
        const data = await response.json()
        const tips = Array.isArray(data) ? data : data.tips || []
        commit("SET_TIPS", tips)
      } catch (error) {
        console.error("Failed to load tips", error)
        commit("SET_TIPS", [])
      }
    },
    logout({ commit }) {
      commit("LOGOUT")
      localStorage.removeItem("token")
    },
  },
})
