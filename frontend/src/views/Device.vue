<template>
  <div class="device container">
    <DeviceTable />
  </div>
</template>

<script>
// @ is an alias to /src
import DeviceTable from "@/components/DeviceTable.vue";

export default {
  name: "Device",
  components: {
    DeviceTable
  }
};
</script>

<style scoped>
.device {
  width: 100%;
}
</style>
