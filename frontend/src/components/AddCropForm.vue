<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-card v-on="on" :class="`d-flex ma-4`">
        <CardInfo v-bind:data="newCrop" />
      </v-card>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add new Crop</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="name" label="Legal Farm Name*" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="plant" label="Plant*" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-file-input
              v-model="image"
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an image"
              prepend-icon="mdi-camera"
              label="Upload Image"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onCreateCrop">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CardInfo from "@/components/CardInfo.vue";
import axios from "axios";

export default {
  name: "AddCropForm",
  components: { CardInfo },
  data: () => ({
    name: "",
    plant: "",
    image: [],
    dialog: false,
    rules: [(value) => !value || value.size < 2000000 || "Avatar size should be less than 2 MB!"],
    newCrop: {
      id: "Add New Crop",
      name: "Add New Crop",
      image:
        "https://icons-for-free.com/iconfiles/png/512/circle+more+plus+icon-1320183136549593898.png",
      location: ""
    }
  }),
  methods: {
    async onCreateCrop() {
      this.dialog = false;
      const payload = {
        name: this.name,
        plant: this.plant,
        image:
          this.image !== []
            ? this.image
            : "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/270609_2200-1200x628.jpg"
      };
      let formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }

      try {
        const url = document.URL;
        const _id = url.substring(url.lastIndexOf("/") + 1);
        let response = await axios.post("http://localhost:3000/crops/create/" + _id, formData);
        if (response.status === 201) {
          // create successfully
          this.$store.dispatch({ type: "getFarmData", _id });
          return true;
        } else return false;
      } catch (error) {
        return false;
      }
    }
  }
};
</script>
