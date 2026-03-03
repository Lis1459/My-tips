import { createStore } from "vuex"

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
    contracts: [],
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getContracts: (state) => state.contracts || [],
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
        // endpoint returns { contracts: [...] }
        commit("SET_CONTRACTS", data.contracts || [])
      } catch (error) {
        console.error("Failed to load contracts", error)
        commit("SET_CONTRACTS", [])
      }
    },
    logout({ commit }) {
      commit("LOGOUT")
      localStorage.removeItem("token")
    },
  },
})
