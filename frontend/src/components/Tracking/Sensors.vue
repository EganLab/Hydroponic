<template>
  <v-card class="mx-auto" color="grey lighten-4" width="100%">
    <v-card-title>
      <v-icon :color="gradient[1]" class="mr-12" size="64">{{ icon }}</v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">{{ name }}</div>
      </v-row>

      <v-spacer></v-spacer>
    </v-card-title>

    <v-sheet color="transparent">
      <Chart />
    </v-sheet>
  </v-card>
</template>

<script>
import Chart from "./Chart";

export default {
  name: "Sensors",
  data: () => ({
    checking: false,
    heartbeats: []
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
