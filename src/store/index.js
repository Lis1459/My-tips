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

      localStorage.setItem("contracts", JSON.stringify(state.contracts))
    },
    ADD_CONTRACT(state, contract) {
      state.contracts.push(contract)

      localStorage.setItem("contracts", JSON.stringify(state.contracts))
    },
    UPDATE_CONTRACT(state, updated) {
      const idx = state.contracts.findIndex((c) => c.id === updated.id)
      if (idx !== -1) {
        state.contracts.splice(idx, 1, updated)
      }

      localStorage.setItem("contracts", JSON.stringify(state.contracts))
    },
    REMOVE_CONTRACT(state, id) {
      state.contracts = state.contracts.filter((c) => c.id !== id)

      localStorage.setItem("contracts", JSON.stringify(state.contracts))
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
        console.log(data)
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
      }
    },
    async addContract({ commit }, contract) {
      if (!contract.id) contract.id = Date.now().toString()
      commit("ADD_CONTRACT", contract)
      return contract
    },
    async updateContract({ commit }, contract) {
      commit("UPDATE_CONTRACT", contract)
      return contract
    },
    async deleteContract({ commit }, id) {
      commit("REMOVE_CONTRACT", id)
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
