<template>
  <div>
    <Profile />
    <StaffInFarm />
    <Crops />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Profile from "@/components/Profile.vue";
import StaffInFarm from "@/components/StaffInFarm.vue";
import Crops from "@/components/Crops.vue";

export default {
  name: "FarmDetail",
  components: {
    Profile,
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
