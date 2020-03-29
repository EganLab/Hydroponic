import axios from "axios";

export default {
  state: {
    user: {
      name
    },
    token: null
  },
  getters: {},
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
          commit("UPDATE_TOKEN", response.data);
          commit("UPDATE_USER_INFO", response.data);
          return true;
        } else return false;
      } catch (error) {
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
    // REGISTER: ({ commit }, { username, email, password }) => {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post(`register`, {
    //         username,
    //         email,
    //         password
    //       })
    //       .then(({ data, status }) => {
    //         if (status === 201) {
    //           resolve(true);
    //         }
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
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
