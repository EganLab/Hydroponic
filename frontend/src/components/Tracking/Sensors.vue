<template>
  <v-card class="mx-auto" color="grey lighten-4" width="100%">
    <v-card-title>
      <v-col class="d-flex" cols="3">
        <v-select v-model="time" :items="items" label="Time"></v-select>
      </v-col>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-sheet color="transparent">
      <Chart v-bind:mode="this.time" v-bind:data="this.data" />
    </v-sheet>
  </v-card>
</template>

<script>
import Chart from "./Chart";
import io from "socket.io-client";
import axios from "axios";

export default {
  name: "Sensors",
  data: () => ({
    items: ["minute", "hour", "all"],
    time: "hour",
    data: [],
    isInit: false,
    isLoaded: false,
    socket: io("localhost:3000")
  }),
  components: {
    Chart
  },
  props: ["data_id"],
  computed: {
    console: () => console
  },
  mounted: async function() {
    await this.getDataByTime("hour");
    this.socket.on("changeData", (data) => {
      console.log("data", data);
    });
  },
  created() {},
  watch: {
    async time() {
      await this.getDataByTime(this.time);
    }
  },
  methods: {
    getDataByTime: async function(bucket) {
      try {
        let response = await axios.get(`http://localhost:3000/sensors/${bucket}/${this.data_id}`);
        this.data = response.data;
        if (bucket === "minute" && !this.isInit) this.initSocket(response.data[0]);
        this.isLoaded = false;
      } catch (error) {
        console.log(error);
      }
    },
    initSocket: async function(change) {
      this.isInit = true;
      this.socket.on(change.bucketId, () => {
        if (!this.isLoaded) {
          this.getDataByTime("minute");
          this.isLoaded = true;
        }
      });
    }
  }
};
</script>
