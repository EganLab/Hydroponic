<template>
  <div class="container">
    <v-row class="font">
      <v-col cols="6">
        <h1>
          <strong>
            Clean and Super Fresh
            <br />Hydroponic Lettuce
          </strong>
        </h1>
        <br />
        <h3>
          GoHydroponic is the best platform for Hydroponic .
          <br />Join with us !
        </h3>
        <v-col class="bt-area" cols="9">
          <v-row>
            <v-col>
              <v-btn :to="{ name: 'Login' }">Sign Up - It's Free</v-btn>
            </v-col>
            <v-col>
              <v-btn color="success">Watch Our Garden</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
      <v-col cols="6">
        <v-img :src="require('../assets/hydroponic-lettuce.jpg')" class="my-3" contain />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Welcome"
};
</script>

<style scoped>
.bt-area {
  margin: auto;
}
</style>
