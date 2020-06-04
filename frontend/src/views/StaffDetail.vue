<template>
  <v-col>
    <StaffProfile v-bind:data="this.data" />
    <v-col>
      <h1>Working in</h1>
    </v-col>

    <v-col>
      <v-row>
        <v-card v-for="farm in this.data.farms" :key="farm._id" :class="`d-flex ma-6`">
          <v-card @click="openFarmDetail(farm._id)">
            <CardInfo v-bind:data="farm" />
          </v-card>
        </v-card>
      </v-row>
    </v-col>
  </v-col>
</template>

<script>
import StaffProfile from "@/components/StaffProfile.vue";
import CardInfo from "@/components/CardInfo.vue";
import axios from "axios";

export default {
  name: "StaffDetail",
  components: {
    StaffProfile,
    CardInfo
  },
  data: () => ({
    data: {}
  }),
  created: function() {
    const url = document.URL;
    const _id = url.substring(url.lastIndexOf("/") + 1);
    this.getStaffInfo(_id);
  },
  computed: {
    console: () => console
  },
  methods: {
    async getStaffInfo(_id) {
      try {
        let response = await axios.get("http://localhost:3000/users/staff/" + _id);
        this.data = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async openFarmDetail(_id) {
      this.$router.push("/farm/" + _id);
    }
  }
};
</script>
