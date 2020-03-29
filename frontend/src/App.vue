<template>
  <v-app>
    <LeftBar />
    <NavBar />

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

// import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    NavBar,
    LeftBar
  }
  // mounted: function() {
  //   this.$nextTick(function() {
  //     console.log("aaa");
  //   });
  // }
};
</script>
