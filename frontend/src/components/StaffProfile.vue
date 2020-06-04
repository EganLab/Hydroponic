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
        <v-col>
          <p
            v-if="this.data.dateOfBirth"
            class="mb-0"
          >Date of birth : {{this.data.dateOfBirth.slice(0,10)}}</p>
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
  name: "FarmProfile",
  data: () => ({}),
  props: {
    data: Object
  },
  computed: {
    console: () => console
  },
  methods: {}
};
</script>