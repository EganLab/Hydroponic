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

    <v-card class="pa-7 mb-7" v-for="device in this.devices" :key="device._id">
      <DeviceDetail v-bind:data="device" />
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import DeviceDetail from "@/components/DeviceDetail.vue";
import AddDeviceForm from "@/components/AddDeviceForm.vue";

export default {
  name: "Tracking",
  props: {
    msg: String
  },
  components: {
    DeviceDetail,
    AddDeviceForm
  },
  data() {
    return {
      name: "",
      message: ""
    };
  },
  computed: {
    ...mapState({
      devices: (state) => state.DeviceModule.devices
    })
  },
  created: async function() {
    const cropId = this.$route.path.split("/").pop();
    this.$store.dispatch("getDeviceList", cropId);
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
    }
  }
};
</script>
