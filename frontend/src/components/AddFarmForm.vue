<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-card v-on="on" :class="`d-flex ma-6`">
        <CardInfo v-bind:data="newStaff" />
      </v-card>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Create Farm</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="name" label="Legal Farm Name*" required></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field v-model="location" label="Location*" required></v-text-field>
            </v-col>

            <v-file-input
              v-model="image"
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an image"
              prepend-icon="mdi-camera"
              label="Upload Image"
            ></v-file-input>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onCreateFarm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CardInfo from "@/components/CardInfo.vue";
import axios from "axios";

export default {
  name: "AddFarmForm",
  components: { CardInfo },
  data: () => ({
    name: "",
    location: "",
    image: [], // default image
    dialog: false,
    newStaff: {
      id: "Add New Farm",
      name: "Add New Farm",
      image:
        "https://icons-for-free.com/iconfiles/png/512/circle+more+plus+icon-1320183136549593898.png",
      location: ""
    },
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    rules: [(value) => !value || value.size < 2000000 || "Avatar size should be less than 2 MB!"]
  }),
  methods: {
    async onCreateFarm() {
      this.dialog = false;
      const payload = new FormData();
      let image =
        this.image !== [] ? this.image : "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg";
      payload.append("image", image);
      payload.append("name", this.name);
      payload.append("location", this.location);

      try {
        let response = await axios.post("http://localhost:3000/farms/create", payload);
        if (response.status === 201) {
          // create successfully
          this.$store.dispatch("validateToken");
          return true;
        } else return false;
      } catch (error) {
        return false;
      } finally {
        this.image = [];
      }
    }
  }
};
</script>
