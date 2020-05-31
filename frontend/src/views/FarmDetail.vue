<template>
  <div>
    <FarmProfile v-bind:data="getFarmDetail" />
    <StaffInFarm v-bind:data="getFarmDetail.staffs" />
    <Crops />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FarmProfile from "@/components/FarmProfile.vue";
import StaffInFarm from "@/components/StaffInFarm.vue";
import Crops from "@/components/Crops.vue";

export default {
  name: "FarmDetail",
  components: {
    FarmProfile,
    StaffInFarm,
    Crops
  },
  created: function() {
    const url = document.URL;
    const _id = url.substring(url.lastIndexOf("/") + 1);
    this.$store.dispatch({ type: "getFarmData", _id });
  },
  computed: {
    ...mapGetters(["getFarmDetail"]),
    console: () => console
  }
};
</script>
