<template>
  <v-card class="mx-auto max-height" color="grey lighten-4" max-width="600">
    <v-card-title>
      <!-- <v-icon :color="gradient[1]" class="mr-12" size="64" @click="takePulse">{{icon}}</v-icon> -->
      <v-row align="start">
        <div v-if="this.data" class="caption grey--text text-uppercase">{{ this.data.name }}</div>
      </v-row>

      <v-spacer></v-spacer>
    </v-card-title>

    <div v-if="this.data && this.data.name === 'Pump'">
      <v-row class="justify-space-around">
        <div class="image">
          <v-img :src="require('../../assets/pump.png')" class="my-3 small-image-size" contain />
        </div>
        <div class="d-flex align-content-center flex-wrap" @click="onControlActuator(pump)">
          <v-switch v-model="pump" :label="`Pump: ${pump.toString()}`" />
        </div>
      </v-row>
    </div>

    <div v-if="this.data && this.data.name === 'Lamp'">
      <v-row class="justify-space-around">
        <div class="image">
          <v-img
            :src="require('../../assets/fertiliser.png')"
            class="my-3 small-image-size"
            contain
          />
        </div>
        <div class="d-flex align-content-center flex-wrap">
          <div class="d-flex align-content-center flex-wrap" @click="onControlActuator(lamp)">
            <v-switch v-model="lamp" :label="`Lamp: ${lamp.toString()}`" />
          </div>
        </div>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Devices",
  props: {
    data: Object
  },
  data: () => ({
    pump: false,
    lamp: false
  }),
  mounted: async function() {
    await this.getActuator();
  },
  computed: {},
  methods: {
    onControlActuator: async function(status) {
      const payload = {
        _id: this.data._id,
        status: status
      };
      let response = await axios.post("http://localhost:3000/actuators/control", payload);
      console.log(response.data);
    },
    getActuator: async function() {
      if (this.data._id) {
        try {
          let response = await axios.get("http://localhost:3000/actuators/" + this.data._id);
          if (response.data.name === "Pump")
            if (response.data.status === "true") this.pump = true;
            else this.pump = false;
          else if (response.data.name === "Lamp")
            if (response.data.status === "true") this.lamp = true;
            else this.lamp = false;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style scoped>
.max-height {
  height: 100%;
}

.tank-limit {
  -webkit-transform: rotate(-90deg); /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: rotate(-90deg); /* IE 9 */
  transform: rotate(-90deg); /* Firefox 16+, IE 10+, Opera */
  transform-origin: top left;

  padding: 15px;
  width: 50%;
}

.small-image-size {
  height: 100px;
  width: 100px;
}

.large-image-size {
  height: 240px;
  width: 180px;
}
</style>
