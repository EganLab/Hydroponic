import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Tracking from "../views/Tracking.vue";
import Device from "../views/Device.vue";
import store from "../store";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/tracking",
    name: "Tracking",
    component: Tracking,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/device",
    name: "Device",
    component: Device,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: ifNotAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
