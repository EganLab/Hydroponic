<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click="updateDrawer" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">GoHydroponic</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
    />
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="32px">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NavBar",
  methods: {
    ...mapActions(["updateDrawer"]),
    handleDrawer() {
      this.updateDrawer();
    }
  }
};
</script>
