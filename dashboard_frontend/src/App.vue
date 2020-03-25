<template>
  <div id="app">
    <div id="nav">
      <LeftBar />
      <NavBar />
      <v-content>
        <v-container class="fill-height" fluid>
          <router-view />
        </v-container>
      </v-content>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import LeftBar from "@/components/LeftBar.vue";

export default {
  components: {
    NavBar,
    LeftBar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
