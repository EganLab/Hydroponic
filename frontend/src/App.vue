<template>
  <v-app>
    <div v-show="isAuthenticated">
      <LeftBar />
      <NavBar />
    </div>
    <div v-show="!isAuthenticated">
      <NavWelcome />
    </div>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import LeftBar from "./components/LeftBar";
import NavWelcome from "./components/NavWelcome";

import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    NavBar,
    LeftBar,
    NavWelcome
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
