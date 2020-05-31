<template>
  <div>
    <StaffProfile v-bind:data="this.data" />
  </div>
</template>

<script>
import StaffProfile from "@/components/StaffProfile.vue";
import axios from "axios";

export default {
  name: "StaffDetail",
  components: {
    StaffProfile
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
    }
  }
};
</script>
