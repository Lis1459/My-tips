import { createStore } from "vuex"

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
    contracts: JSON.parse(localStorage.getItem("contracts") || "[]"),
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
    ADD_CONTRACT(state, contract) {
      state.contracts.push(contract)
    },
    UPDATE_CONTRACT(state, updated) {
      const idx = state.contracts.findIndex((c) => c.id === updated.id)
      if (idx !== -1) {
        state.contracts.splice(idx, 1, updated)
      }
    },
    REMOVE_CONTRACT(state, id) {
      state.contracts = state.contracts.filter((c) => c.id !== id)
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
      const responce = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
      if (!responce.ok) {
        throw new Error(data.message || "Login failed")
      }
      const data = await responce.json()

      commit("SET_USER", data)
      commit("SET_TOKEN", data.accessToken)

      localStorage.setItem("token", data.accessToken)

      return true
    },

    async fetchContracts({ commit, state }) {
      try {
        const current = JSON.parse(localStorage.getItem("contracts") || "null")
        if (Array.isArray(current)) {
          commit("SET_CONTRACTS", current)
          return
        }
        const response = await fetch("https://dummyjson.com/c/913d-107d-44d8-873f")
        const data = await response.json()
        commit("SET_CONTRACTS", data.contracts || [])
      } catch (error) {
        console.error("Failed to load contracts", error)
        commit("SET_CONTRACTS", [])
      } finally {
        localStorage.setItem("contracts", JSON.stringify(state.contracts))
      }
    },

    async addContract({ commit, state }, contract) {
      if (!contract.id) contract.id = Date.now().toString()
      commit("ADD_CONTRACT", contract)
      localStorage.setItem("contracts", JSON.stringify(state.contracts))
      return contract
    },
    async updateContract({ commit, state }, contract) {
      commit("UPDATE_CONTRACT", contract)
      localStorage.setItem("contracts", JSON.stringify(state.contracts))

      return contract
    },
    async deleteContract({ commit, state }, id) {
      commit("REMOVE_CONTRACT", id)
      localStorage.setItem("contracts", JSON.stringify(state.contracts))
      return true
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
      localStorage.removeItem("contracts")
    },
  },
})
