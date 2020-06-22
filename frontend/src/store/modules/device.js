import axios from "axios";

const state = {
  devices: []
};

const getters = {
  getDeviceList: (state) => state.devices
};

const mutations = {
  UPDATE_DEVICES_LIST: (state, devices) => {
    state.devices = devices;
  }
};

const actions = {
  getDeviceList: async ({ commit }, cropId) => {
    try {
      let response = await axios.get("http://localhost:3000/crops/" + cropId);
      const devices = response.data.devices;
      commit("UPDATE_DEVICES_LIST", devices);
    } catch (error) {
      return false;
    }
  },
  addDevice: async ({ dispatch }, { cropId, device }) => {
    try {
      const response = await axios.post("http://localhost:3000/devices/create/" + cropId, device);
      if (response.status === 201) {
        dispatch("getDeviceList", cropId);
      }
    } catch (error) {
      return false;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
