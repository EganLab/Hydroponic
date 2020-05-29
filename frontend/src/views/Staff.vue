<template>
  <v-row>
    <v-card v-for="staff in staffs" :key="staff.id" :class="`d-flex ma-6`">
      <CardInfo v-bind:data="staff" />
    </v-card>
    <AddStaffForm v-if="staffs.length>0" />
  </v-row>
</template>

<script>
// @ is an alias to /src
import CardInfo from "@/components/CardInfo.vue";
import AddStaffForm from "@/components/AddStaffForm.vue";

export default {
  name: "Staff",
  components: {
    CardInfo,
    AddStaffForm
  },
  data: () => ({
    staffs: [
      {
        id: 1,
        name: "Marcus",
        image: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        location: "Ha noi"
      },
      {
        id: 2,
        name: "Tom",
        image: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        location: "Ha noi"
      }
    ]
  }),
  computed: {
    console: () => console
  },
  methods: {
    createStaff: function() {
      console.log("aaaa");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
