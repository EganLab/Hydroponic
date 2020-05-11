<template>
  <div class="container">
    <v-row class="font">
      <v-col cols="6">
        <v-img :src="require('../assets/hydroponics.png')" class="my-3" contain />
      </v-col>
      <v-col cols="6">
        <h1>
          <span>
            Hydroponic Growing :
            <br />The art of growing plants without soil.
          </span>
        </h1>
        <br />

        <h3>
          HYDROPONICS, GROWING PLANTS IN A NUTRIENT SOLUTION ROOT MEDIUM, IS A GROWING AREA OF
          COMMERCIAL FOOD PRODUCTION.
        </h3>
        <br />
        <hr />
        <br />
        <p>
          The word hydroponics is derived from two Greek words: ‚hydro‘ meaning water and ‚ponos‘
          meaning labor. Hydroponic production can be with or without the use of an artificial
          medium (such as perlite, sand, gravel, peat, or sawdust) to provide mechanical support.
        </p>
        <br />
        <p>
          If you have ever suspended the pit from an avocado over water in a glass, or grown a sweet
          potato plant in water as part of a classroom experiment, you were using an elementary
          hydroponic system!
        </p>
        <br />
        <p>
          Although you may have only used water, a true hydroponics garden combines the use of
          water, a substrate, and a nutrient solution to grow plants quickly in far less space than
          a traditional garden.
        </p>
        <br />
        <p>
          The majority of hydroponic gardens are used to grow vegetables. However, this gardening
          method is also a great solution for creating unique flower gardens indoors or outdoors
          using a variety of container options.
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap");

.font {
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 200;
}
</style>
