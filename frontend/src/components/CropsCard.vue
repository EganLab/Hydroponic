<template>
  <v-card class="mx-auto" width="400">
    <v-card-text class="pt-0">
      <div class="title font-weight-boil mb-2">{{this.crop.name}}</div>
      <div class="subheading font-weight-light grey--text">{{this.crop.plant}}</div>
    </v-card-text>

    <v-img
      v-bind:src="this.crop.image"
      max-width="calc(100% - 32px)"
      class="grey darken-4 mx-auto mb-5"
    ></v-img>

    <div v-if="crop.devices && crop.devices.length > 0">
      <v-sheet
        class="v-sheet--offset mx-auto mb-5"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
      </v-sheet>

      <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
      </v-sheet>
    </div>

    <div v-else>
      <v-card-title>Create new Crop successfully</v-card-title>
      <v-card-subtitle>Please click to setup Device</v-card-subtitle>
    </div>

    <v-card-text>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>mdi-clock</v-icon>
      <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CropsCard",
  props: {
    data: String
  },
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
    crop: {}
  }),
  created: async function() {
    try {
      let response = await axios.get("http://localhost:3000/crops/" + this.data);
      this.crop = response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>