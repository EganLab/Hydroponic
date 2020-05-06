<template>
  <div class="device container">
    <v-row class="justify-end">
      <v-col class="pa-8 d-flex flex-row-reverse" cols="5">
        <v-row class="md-7 justify-space-between">
          <div class="my-2">
            <h3>Add Device</h3>
          </div>

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

    <DeviceTable />
  </div>
</template>

<script>
import DeviceTable from "@/components/DeviceTable.vue";
import AddDeviceForm from "@/components/AddDeviceForm.vue";

export default {
  name: "Device",
  components: {
    DeviceTable,
    AddDeviceForm
  }
};
</script>

<style scoped>
.device {
  width: 100%;
}
</style>
