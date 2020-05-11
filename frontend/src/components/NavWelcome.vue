<template>
  <div>
    <v-toolbar class="container" flat>
      <v-toolbar-title style="width: 160px;" class="ml-0 pl-4">
        <span class="hidden-sm-and-down font-weight-bold">GoHydroponic</span>
      </v-toolbar-title>
      <div>
        <v-btn class="font-weight-bold" text large :to="{ name: 'Welcome' }">Home</v-btn>
      </div>
      <div>
        <v-btn class="font-weight-bold" text large :to="{ name: 'About' }">About</v-btn>
      </div>
      <v-spacer />
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "NavWelcome"
};
</script>

<style scoped>
.font-weight-bold {
  color: #4cae50;
}

.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
  opacity: 0 !important;
}
</style>
