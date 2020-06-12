<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="data.name" label="Legal Staff Name*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="data.email" label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="data.password" label="Password*" type="password" required></v-text-field>
            </v-col>

            <v-col cols="24">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="data.date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="data.dateOfBirth"
                    label="Your date of birth"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="data.dateOfBirth" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(data.dateOfBirth)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="data.phonenumber" label="Phone Number"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="data.farms[0]._id"
                :items="getFarmLabel"
                item-text="name"
                item-value="_id"
                label="Farm"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-file-input
                v-model="data.image"
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an image"
                prepend-icon="mdi-camera"
                label="Upload Image"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onUpdate">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data: () => {
    return {
      menu: false,
      updateStaff: {
        id: "add new staff",
        name: "add new staff",
        image:
          "https://icons-for-free.com/iconfiles/png/512/circle+more+plus+icon-1320183136549593898.png",
        location: ""
      }
    };
  },
  props: {
    data: Object,
    dialog: Boolean
  },
  computed: {
    ...mapGetters(["getFarmLabel"])
  },
  methods: {
    async onUpdate() {
      try {
        console.log(this.data);
        const response = await axios.patch(`http://localhost:3000/users/staff/${this.data._id}`);
        if (response.status === 200) {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeDialog() {
      this.$store.dispatch("closeEditDialog");
    }
  }
};
</script>

<style>
</style>
