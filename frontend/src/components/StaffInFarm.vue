<template>
  <v-col>
    <h1 class="text--secondary">Staffs</h1>
    <v-container fluid>
      <v-card>
        <v-data-table
          v-if="this.data"
          :headers="headers"
          :items="this.data"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.image="{ item }">
            <v-avatar size="36">
              <v-img v-bind:src="item.image" />
            </v-avatar>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-col>
</template>

<script>
export default {
  name: "StaffInFarm",
  props: {
    data: Array
  },
  data: () => ({
    headers: [
      {
        text: "Image",
        align: "start",
        sortable: false,
        value: "image"
      },
      { text: "Name", value: "name" }
    ]
  }),
  computed: {
    console: () => console
  },
  methods: {}
};
</script>