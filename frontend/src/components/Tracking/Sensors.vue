<template>
  <v-card class="mx-auto" color="grey lighten-4" width="100%">
    <v-card-title>
      <v-icon :color="gradient[1]" class="mr-12" size="64">{{ icon }}</v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">{{ name }}</div>
      </v-row>
      <v-col cols="7"></v-col>
      <v-col class="d-flex" cols="3">
        <v-select v-model="time" :items="items" label="Time"></v-select>
      </v-col>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-sheet color="transparent">
      <Chart v-bind:mode="this.time" />
    </v-sheet>
  </v-card>
</template>

<script>
import Chart from "./Chart";

export default {
  name: "Sensors",
  data: () => ({
    checking: false,
    heartbeats: [],
    items: ["Minute", "Hour", "From start"],
    time: "Minute"
  }),
  components: {
    Chart
  },
  props: ["name", "icon", "gradient", "unit"],
  computed: {
    console: () => console
  },

  created() {},

  methods: {}
};
</script>
