<template>
  <v-container fluid>
    <v-col>
      <v-card class="pa-5">
        <v-avatar size="62">
          <v-img v-bind:src="this.data.image" />
        </v-avatar>
        <h2>{{this.data.name}}</h2>
        <v-col>
          <p class="mb-0">Email : {{this.data.email}}</p>
        </v-col>
        <v-col>
          <p class="mb-0">Phone number : {{this.data.phonenumber}}</p>
        </v-col>

        <!-- <v-col>
          <v-row>
            <v-col cols="6">
              <p class="mb-0">Number of staffs: {{this.data.staffs.length}}</p>
            </v-col>
            <v-col cols="6">
              <p class="mb-0">Number of crops: {{this.data.crops.length}}</p>
            </v-col>
          </v-row>
        </v-col>-->
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
  name: "FarmProfile",
  data: () => ({}),
  props: {
    data: Object
  },
  methods: {}
};
</script>