<template>
  <v-navigation-drawer :value="getDrawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list dense>
      <template v-for="item in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-col>
          <v-col cols="6" class="text-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-col>
        </v-row>
        <v-list-item v-else :key="item.text" :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LeftBar",
  computed: {
    ...mapGetters(["getDrawer"])
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-contacts", text: "Contacts", link: "/" },
      { icon: "mdi-history", text: "Tracking", link: "/tracking" },
      { icon: "mdi-content-copy", text: "Device", link: "/device" }
    ]
  })
};
</script>
