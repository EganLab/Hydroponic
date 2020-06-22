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

    <v-menu bottom :offset-y="true">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-avatar size="32px">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="profile">
          <v-list-item-title>
            Hello
            <strong>{{ getUserInfo.name }}</strong>
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="changePassword">
          <v-list-item-title>Change password</v-list-item-title>
        </v-list-item>
        <v-list-item @click="this.logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item @click="this.logoutAll">
          <v-list-item-title>Logout All Device</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    ...mapActions(["updateDrawer", "logout", "logoutAll"]),
    handleDrawer() {
      this.updateDrawer();
    },
    profile() {
      console.log("profile");
    },
    changePassword() {
      this.$router.push({ name: "ChangePassword" });
    }
  }
};
</script>
