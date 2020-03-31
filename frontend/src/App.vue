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

import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    NavBar,
    LeftBar
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapActions(["validateToken"])
  },
  created: function() {
    if (this.$store.getters.isHaveToken) {
      this.validateToken;
    }
  }
};
</script>
