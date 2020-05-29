import axios from "axios";

export default {
  state: {
    farmLabel: [],
    farmDetail: {}
  },
  getters: {
    getFarmLabel: (state) => state.farmLabel,
    getFarmDetail: (state) => state.farmDetail
  },
  mutations: {
    // update LeftBar status
    UPDATE_FARMLABEL: (state, { farms }) => {
      return (state.farmLabel = farms);
    },
    // update FarmDetail status
    UPDATE_FARMDETAIL: (state, { data }) => {
      return (state.farmDetail = data);
    }
  },
  actions: {
    getFarmData: async ({ commit }, { _id }) => {
      try {
        let response = await axios.get("http://localhost:3000/farms/" + _id);
        commit("UPDATE_FARMDETAIL", response);
      } catch (error) {
        return false;
      }
    }
  }
};
