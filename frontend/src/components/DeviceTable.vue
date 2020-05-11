<template>
  <v-card :elevation="10">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Type</th>
            <th class="text-left">Calories</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.calories }}</td>

            <!-- Status of device -->
            <td v-if="item.status == 1">
              <v-chip
                class="ma-2 chip-width"
                v-on:click="turnOnOff(item.status)"
                color="green"
                text-color="white"
                >Active</v-chip
              >
            </td>
            <td v-if="item.status == 2">
              <v-chip
                class="ma-2 chip-width"
                v-on:click="turnOnOff(item.status)"
                color="red"
                text-color="white"
                >Stop</v-chip
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "DeviceTable",
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          type: "abc",
          status: 1,
          calories: 159
        },
        {
          name: "Ice cream sandwich",
          type: "abc",
          status: 1,
          calories: 237
        },
        {
          name: "Eclair",
          type: "abc",
          status: 2,
          calories: 262
        },
        {
          name: "Cupcake",
          type: "abc",
          status: 2,
          calories: 305
        },
        {
          name: "Gingerbread",
          type: "abc",
          status: 1,
          calories: 356
        },
        {
          name: "Jelly bean",
          type: "abc",
          status: 1,
          calories: 375
        },
        {
          name: "Lollipop",
          type: "abc",
          status: 1,
          calories: 392
        },
        {
          name: "Honeycomb",
          type: "abc",
          status: 2,
          calories: 408
        },
        {
          name: "Donut",
          type: "abc",
          status: 1,
          calories: 452
        },
        {
          name: "KitKat",
          type: "abc",
          status: 1,
          calories: 518
        }
      ]
    };
  },
  methods: {
    async turnOnOff(device_id) {
      console.log(device_id);
    }
  }
};
</script>

<style scoped>
.chip-width {
  width: 70px;
  margin-left: 0px !important;
  text-align: center;
}

.v-application .ma-2 {
  margin: 8px 0px !important;
}
</style>
