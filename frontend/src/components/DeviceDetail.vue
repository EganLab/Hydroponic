<template>
  <v-col>
    <h1 class="my-7">{{ data._id }}</h1>
    <h2 class="my-7">Sensor Data</h2>

    <Sensors class="my-7" v-bind:data_id="data._id" />

    <h2 class="my-7">Actuators control</h2>

    <v-row class="justify-space-around">
      <v-col cols="5" class="half-heigh" v-for="actuator in this.actuators" :key="actuator._id">
        <Devices class="my-7" v-bind:data="actuator" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import Sensors from "@/components/Tracking/Sensors.vue";
import Devices from "@/components/Tracking/Devices.vue";

import axios from "axios";

export default {
  name: "DeviceDetail",
  props: {
    data: Object
  },
  components: {
    Sensors,
    Devices
  },
  data: () => ({
    sensor: [],
    actuators: []
  }),
  mounted: async function() {
    await this.getActuators();
  },
  computed: {},
  methods: {
    getActuators: async function() {
      try {
        let response = await axios.get("http://localhost:3000/devices/" + this.data._id);

        this.sensor = response.data.sensor;
        this.actuators = response.data.actuators;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.half-heigh {
  height: 200px;
}

.tank-heigh {
  height: 403px;
}
</style>
