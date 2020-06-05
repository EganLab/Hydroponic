<template>
  <v-col>
    <h1 class="text--secondary">Crops</h1>
    <v-row>
      <AddCropForm />
      <v-card
        v-for="crop in getFarmDetail.crops"
        :key="crop._id"
        :class="`d-flex ma-4`"
        @click="openCropDetail(crop._id)"
      >
        <CropsCard v-bind:data="crop._id" />
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
import CropsCard from "@/components/CropsCard.vue";
import AddCropForm from "@/components/AddCropForm.vue";
import { mapGetters } from "vuex";

export default {
  name: "Crops",
  components: { CropsCard, AddCropForm },
  data: () => ({}),
  computed: {
    ...mapGetters(["getFarmDetail"]),
    console: () => console
  },
  methods: {
    // Open crop detail
    async openCropDetail(_id) {
      this.$router.push("/tracking/" + _id);
    }
  }
};
</script>