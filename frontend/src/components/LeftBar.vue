<template>
  <v-navigation-drawer :value="getDrawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list v-if="getUserInfo.role === 1" dense>
      <template v-for="item in items">
        <v-list-item :key="item.text" :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-list v-else dense>
      <template v-for="item in staff_items">
        <v-list-item :key="item.text" :to="item.link">
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
    ...mapGetters(["getDrawer", "getUserInfo"])
  },
  mounted: async function() {
    await this.getFarm();
  },
  watch: {
    async getUserInfo() {
      if (JSON.stringify(this.getUserInfo) !== this.checkLoadingFarm) {
        this.checkLoadingFarm = JSON.stringify(this.getUserInfo);
        await this.getFarm();
      }
    }
  },
  data: () => ({
    drawer: null,
    checkLoadingFarm: "",
    items: [
      { icon: "mdi-contacts", text: "Contacts", link: "/" },
      { icon: "mdi-account-box", text: "Staff", link: "/staff" },
      { icon: "mdi-factory", text: "Farm", link: "/farm" }
      // { icon: "mdi-content-copy", text: "Device", link: "/device" }
    ],
    staff_items: [{ icon: "mdi-contacts", text: "Contacts", link: "/" }]
  }),
  methods: {
    async getFarm() {
      if (this.getUserInfo.role === 2) {
        let farms = [];
        await Promise.all(
          this.getUserInfo.farms.map((farm) => {
            let item = {};
            item.icon = "mdi-factory";
            item.text = farm.name;
            item.link = `/farm/${farm._id}`;
            farms.push(item);
            Promise.resolve(farms);
          })
        );
        this.staff_items = this.staff_items.concat(farms);
      }
    }
  }
};
</script>
