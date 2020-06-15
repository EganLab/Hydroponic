import Vue from "vue";
import Vuex from "vuex";

import UIModule from "./modules/ui";
import UserModule from "./modules/user";
import FarmModule from "./modules/farm";
import DialogModule from "./modules/dialog";
import DeviceModule from "./modules/device";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UIModule,
    UserModule,
    FarmModule,
    DialogModule,
    DeviceModule
  }
});
