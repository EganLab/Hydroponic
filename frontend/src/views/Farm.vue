<template>
  <v-row>
    <v-card v-for="farm in farms" :key="farm.id" :class="`d-flex ma-6`">
      <CardInfo v-bind:data="farm" />
    </v-card>
  </v-row>
</template>

<script>
// @ is an alias to /src
import CardInfo from "@/components/CardInfo.vue";

export default {
  name: "Farm",
  components: {
    CardInfo
  },
  data: () => ({
    farms: [
      {
        id: 1,
        name: "Start",
        image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        location: "Ha noi"
      },
      {
        id: 2,
        name: "end",
        image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        location: "Ha noi"
      },
      {
        id: "add new",
        name: "add new farm",
        image:
          "https://icons-for-free.com/iconfiles/png/512/circle+more+plus+icon-1320183136549593898.png",
        location: ""
      }
    ]
  }),
  computed: {
    console: () => console
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  top: 0px;
}
</style>
