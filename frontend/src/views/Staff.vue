<template>
  <v-row>
    <AddStaffForm />

    <v-card v-for="staff in getStaffsLabel" :key="staff._id" :class="`d-flex ma-6`">
      <v-card @click="openUserDetail(staff._id)">
        <CardInfo v-bind:data="staff" />
      </v-card>
    </v-card>
  </v-row>
</template>

<script>
// @ is an alias to /src
import CardInfo from "@/components/CardInfo.vue";
import AddStaffForm from "@/components/AddStaffForm.vue";
import { mapGetters } from "vuex";

export default {
  name: "Staff",
  components: {
    CardInfo,
    AddStaffForm
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["getStaffsLabel"]),
    console: () => console
  },
  methods: {
    // Open farm detail
    async openUserDetail(_id) {
      this.$router.push("/staff/" + _id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
