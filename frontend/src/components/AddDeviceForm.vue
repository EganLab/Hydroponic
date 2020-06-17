<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Device Info</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Device</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field v-model="security_code" label="Security code*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onAddDevice">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "AddDeviceForm",
  data: () => ({
    security_code: "",
    dialog: false
  }),
  methods: {
    onAddDevice() {
      this.dialog = false;
      if (this.security_code) {
        let device = {
          security_code: this.security_code
        };

        const cropId = this.$route.path.split("/").pop();
        this.$store.dispatch("addDevice", { cropId, device });
      }
    },
    async onSave() {
      this.dialog = false;
    }
  }
};
</script>
