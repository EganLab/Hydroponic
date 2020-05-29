import axios from "axios";
import router from "../../router";

export default {
  state: {
    user: {},
    token: localStorage.getItem("user-token") || "",
    staffLabel: []
  },
  getters: {
    isAuthenticated: (state) => !!state.user.name,
    isHaveToken: (state) => !!state.token,
    getUserInfo: (state) => state.user,
    getStaffsLabel: (state) => state.staffLabel
  },
  mutations: {
    // update User info
    UPDATE_USER_INFO: (state, { user }) => {
      return (state.user = user);
    },
    // update LeftBar status
    UPDATE_TOKEN: (state, { token }) => {
      axios.defaults.headers.common["Authorization"] = token;
      return (state.token = token);
    },
    UPDATE_STAFFSLABEL: (state, { staffs }) => {
      return (state.staffLabel = staffs);
    }
  },
  actions: {
    login: async ({ commit }, payload) => {
      try {
        let response = await axios.post("http://localhost:3000/users/login", payload);
        if (response.status === 200) {
          // store user token
          localStorage.setItem("user-token", response.data.token);
          commit("UPDATE_TOKEN", response.data);
          commit("UPDATE_USER_INFO", response.data);
          router.push("/home");
          return true;
        } else return false;
      } catch (error) {
        // if the request fails, remove any possible user token if possible
        localStorage.removeItem("user-token");
        return false;
      }
    },
    register: async ({ commit }, payload) => {
      try {
        let response = await axios.post("http://localhost:3000/users", payload);
        if (response.status === 200) {
          localStorage.setItem("user-token", response.data.token);
          commit("UPDATE_TOKEN", response.data);
          commit("UPDATE_USER_INFO", response.data);
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    validateToken: async ({ commit }) => {
      try {
        let response = await axios.get("http://localhost:3000/users/me");
        commit("UPDATE_USER_INFO", response.data);
        // update staff label
        commit("UPDATE_STAFFSLABEL", response.data.user);
        // update farm label
        commit("UPDATE_FARMLABEL", response.data.user);
        return true;
      } catch (error) {
        console.log("validateToken", error);
        return false;
      }
    },
    logout: async ({ commit }) => {
      try {
        let response = await axios.post("http://localhost:3000/users/me/logout");
        if (response.data.success) {
          // remove token in localStorage
          localStorage.removeItem("user-token");
          // Reset state
          let data = {
            user: {},
            token: ""
          };
          commit("UPDATE_USER_INFO", data);
          commit("UPDATE_TOKEN", data);
          router.push("/");
        }
      } catch (error) {
        return error;
      }
    },
    logoutAll: async ({ commit }) => {
      try {
        let response = await axios.post("http://localhost:3000/users/me/logoutall");
        if (response.data.success) {
          // remove token in localStorage
          localStorage.removeItem("user-token");
          // Reset state
          let data = {
            user: {},
            token: ""
          };
          commit("UPDATE_USER_INFO", data);
          commit("UPDATE_TOKEN", data);
          router.push("/");
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
