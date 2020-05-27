import axios from "axios";

export default {
  state: {
    farmLabel: []
  },
  getters: {
    getFarmLabel: (state) => state.farmLabel
  },
  mutations: {
    // update LeftBar status
    UPDATE_FARMLABEL: (state, { farms }) => {
      return (state.farmLabel = farms);
    }
  },
  actions: {
    getLabel: async ({ commit }) => {
      try {
        let response = await axios.get("http://localhost:3000/users/me");
        commit("UPDATE_FARMLABEL", response.data.user);
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
