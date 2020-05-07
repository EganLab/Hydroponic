<template>
  <v-app>
    <div v-show="isAuthenticated">
      <LeftBar />
      <NavBar />
    </div>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import LeftBar from "./components/LeftBar";

import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    NavBar,
    LeftBar
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
