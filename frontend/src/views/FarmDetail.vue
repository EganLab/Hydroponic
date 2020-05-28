<template>
  <div class="home">
    <div>hel</div>
    {{console.log(getFarmDetail)}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FarmDetail",
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
