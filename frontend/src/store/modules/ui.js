export default {
  state: {
    // drawer for LeftBar status
    drawer: false
  },
  getters: {
    getDrawer: (state) => state.drawer
  },
  mutations: {
    // update LeftBar status
    UPDATE_DRAWER: (state) => {
      return (state.drawer = !state.drawer);
    }
  },
  actions: {
    updateDrawer: ({ commit }) => {
      commit("UPDATE_DRAWER");
    }
  }
};
