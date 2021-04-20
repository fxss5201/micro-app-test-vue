export default {
  namespaced: true,
  state: {
    token: 'store123456'
  },
  mutations: {
    setToken (state, val) {
      console.log(val)
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  }
}
