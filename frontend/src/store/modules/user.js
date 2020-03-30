import axios from "axios";

export default {
  state: {
    user: {
      name
    },
    token: localStorage.getItem("user-token") || ""
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status
  },
  mutations: {
    // update User info
    UPDATE_USER_INFO: (state, { user }) => {
      return (state.user.name = user.name);
    },
    // update LeftBar status
    UPDATE_TOKEN: (state, { token }) => {
      return (state.token = token);
    }
  },
  actions: {
    login: async ({ commit }, payload) => {
      try {
        let response = await axios.post("http://localhost:30001/users/login", payload);
        if (response.status === 200) {
          // store user token
          localStorage.setItem("user-token", response.data.token);
          commit("UPDATE_TOKEN", response.data);
          commit("UPDATE_USER_INFO", response.data);
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
        let response = await axios.post("http://localhost:30001/users", payload);
        if (response.status === 200) {
          commit("UPDATE_TOKEN", response.data);
          commit("UPDATE_USER_INFO", response.data);
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    // REFRESH_TOKEN: () => {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post(`token/refresh`)
    //       .then((response) => {
    //         resolve(response);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // }
  }
};
