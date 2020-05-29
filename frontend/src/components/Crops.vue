<template>
  <v-col>
    <h1 class="text--secondary">Crops</h1>
    <v-row>
      <v-card
        v-for="crop in crops"
        :key="crop._id"
        :class="`d-flex ma-4`"
        @click="openCropDetail(crop._id)"
      >
        <CropsCard />
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
import CropsCard from "@/components/CropsCard.vue";

export default {
  name: "Crops",
  components: { CropsCard },
  data: () => ({
    crops: [
      {
        _id: 1
      },
      {
        _id: 2
      },
      {
        _id: 3
      }
    ]
  }),
  methods: {
    // Open crop detail
    async openCropDetail(_id) {
      console.log(_id);
    }
  }
};
</script>