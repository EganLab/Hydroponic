import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

let token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
