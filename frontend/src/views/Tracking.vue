<template>
  <div class="container">
    <v-row class="justify-end">
      <v-col class="pa-8 d-flex flex-row-reverse" cols="5">
        <v-row class="md-7 justify-space-between">
          <v-col cols="3">
            <v-row class="align-center">
              <h3>Add Device</h3>
            </v-row>
          </v-col>

          <div class="my-2">
            <!-- Dialog Form -->
            <AddDeviceForm />
          </div>
          <div class="my-2">
            <v-btn color="primary">By QR code</v-btn>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <h1 class="my-7">General Stats</h1>
    <v-row class="justify-space-between">
      <Sensors
        name="Humidity"
        icon="mdi-water"
        v-bind:gradient="['#89f7fe', '#66a6ff']"
        unit="% RH"
      />
      <Sensors
        name="Temperature"
        icon="mdi-temperature-celsius"
        v-bind:gradient="['#fad0c4', '#ff9a9e']"
        unit="°C"
      />
    </v-row>

    <h1 class="my-7">Sensor data</h1>

    <v-row class="justify-space-around">
      <v-col cols="5" class="half-heigh">
        <Devices class="my-7" name="Pump" status="Running" />
        <Devices class="my-7" name="Fertiliser" status="Available" />
      </v-col>
      <v-col cols="5" class="tank-heigh">
        <Devices class="my-7" name="Water Tank" status="Liters" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

import Sensors from "@/components/Tracking/Sensors.vue";
import Devices from "@/components/Tracking/Devices.vue";
import AddDeviceForm from "@/components/AddDeviceForm.vue";

export default {
  name: "Tracking",
  props: {
    msg: String
  },
  components: {
    Sensors,
    Devices,
    AddDeviceForm
  },
  data() {
    return {
      name: "",
      message: "",
      socket: io("localhost:3000")
    };
  },
  mounted: function() {
    this.socket.on("changeData", (data) => {
      console.log("data", data);
    });
  },
  methods: {
    // with http
    async sendName() {
      if (this.name) {
        let name = {
          name: this.name
        };
        axios
          .post("http://localhost:3000/devices/add", name)
          .then((res) => {
            console.log("res", res);
          })
          .catch((error) => {
            console.log(error);
          });
        this.name = "";
      }
    },
    // with socket
    async sendMessage() {
      if (this.message) {
        let message = {
          handle: this.handle,
          message: this.message
        };
        console.log(message);
        await this.socket.emit("chat", message);
        this.message = "";
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
