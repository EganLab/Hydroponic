<template>
  <v-card class="mx-auto" max-width="250">
    <v-img v-bind:src="data.image" height="200px"></v-img>

    <v-card-title>{{data.name}}</v-card-title>
    <v-card-subtitle>{{data.location}}</v-card-subtitle>
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CardInfo",
  props: {
    data: Object
  },
  computed: {
    console: () => console
  }
};
</script>
