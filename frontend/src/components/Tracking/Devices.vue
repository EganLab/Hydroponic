<template>
  <v-card class="mx-auto max-height" color="grey lighten-4" max-width="600">
    <v-card-title>
      <!-- <v-icon :color="gradient[1]" class="mr-12" size="64" @click="takePulse">{{icon}}</v-icon> -->
      <v-row align="start">
        <div class="caption grey--text text-uppercase">{{name}}</div>
      </v-row>

      <v-spacer></v-spacer>

      <v-btn icon class="align-self-start" size="28">
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
    </v-card-title>

    <div v-show="name=='Pump'">
      <v-row class="justify-space-around">
        <div class="image">
          <v-img :src="require('../../assets/pump.png')" class="my-3 small-image-size" contain />
        </div>
        <div class="d-flex align-content-center flex-wrap">
          <div>
            <span class="display-2 font-weight-black" v-text="200"></span>
            <strong>{{status}}</strong>
          </div>
        </div>
      </v-row>
    </div>

    <div v-show="name=='Fertiliser'">
      <v-row class="justify-space-around">
        <div class="image">
          <v-img
            :src="require('../../assets/fertiliser.png')"
            class="my-3 small-image-size"
            contain
          />
        </div>
        <div class="d-flex align-content-center flex-wrap">
          <div>
            <span class="display-2 font-weight-black" v-text="200"></span>
            <strong>{{status}}</strong>
          </div>
        </div>
      </v-row>
    </div>

    <div v-show="name=='Water Tank'">
      <v-row class="justify-space-around">
        <div class="image">
          <v-img :src="require('../../assets/tank.png')" class="my-3 large-image-size" contain />
        </div>
        <div class="d-flex align-content-center flex-wrap">
          <div>
            <span class="display-2 font-weight-black" v-text="200"></span>
            <strong>{{status}}</strong>
          </div>
        </div>
      </v-row>
      <v-sheet color="transparent">
        <div class="tank-limit">
          <v-progress-linear value="50" :height="'8px'" color="light-blue" :rounded="true"></v-progress-linear>
        </div>
      </v-sheet>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Devices",
  props: ["name", "status"]
};
</script>

<style scoped>
.max-height {
  height: 100%;
}

.tank-limit {
  -webkit-transform: rotate(-90deg); /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: rotate(-90deg); /* IE 9 */
  transform: rotate(-90deg); /* Firefox 16+, IE 10+, Opera */
  transform-origin: top left;

  padding: 15px;
  width: 50%;
}

.small-image-size {
  height: 100px;
  width: 100px;
}

.large-image-size {
  height: 240px;
  width: 180px;
}
</style>