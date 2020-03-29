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
// import HelloWorld from "./components/HelloWorld";
import NavBar from "./components/NavBar";
import LeftBar from "./components/LeftBar";

export default {
  name: "App",

  components: {
    // HelloWorld,
    NavBar,
    LeftBar
  }
};
</script>
