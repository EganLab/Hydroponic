<template>
  <v-container fluid>
    <v-col cols="24">
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          max-height="225"
          class="grey darken-4"
        ></v-img>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-5">
        <h2>Farm : {{this.name}}</h2>
        <v-col>
          <p class="mb-0">Location : {{this.location}}</p>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="6">
              <p class="mb-0">Number of staffs: {{this.staffs.length}}</p>
            </v-col>
            <v-col cols="6">
              <p class="mb-0">Number of crops: {{this.crops.length}}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row class="justify-end">
            <v-btn small color="success">Edit</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    name: "Apolo",
    location: "Vinh Yen, Vinh Phuc",
    staffs: [],
    crops: []
  }),
  methods: {}
};
</script>