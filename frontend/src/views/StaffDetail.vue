<template>
  <div>
    <Profile />
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import Profile from "@/components/Profile.vue";

export default {
  name: "StaffDetail",
  components: {
    Profile
  },
  created: function() {
    // const url = document.URL;
    // const _id = url.substring(url.lastIndexOf("/") + 1);
    // this.$store.dispatch({ type: "getFarmData", _id });
  },
  computed: {
    // ...mapGetters(["getFarmDetail"]),
    console: () => console
  }
};
</script>
