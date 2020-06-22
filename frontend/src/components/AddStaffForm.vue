<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-card v-on="on" :class="`d-flex ma-6`">
        <CardInfo v-bind:data="newStaff" />
      </v-card>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="name" label="Legal Staff Name*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="email" label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="24">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Your date of birth"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="phonenumber" label="Phone Number"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="farm"
                :items="getFarmLabel"
                item-text="name"
                item-value="_id"
                label="Farm"
              ></v-select>
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onCreateStaff">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CardInfo from "@/components/CardInfo.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "AddStaffForm",
  components: { CardInfo },
  data: () => ({
    dialog: false,
    name: "",
    email: "",
    password: "",
    date: new Date().toISOString().substr(0, 10),
    phonenumber: "",
    farm: "",
    menu: false,
    image: [],
    rules: [(value) => !value || value.size < 2000000 || "Avatar size should be less than 2 MB!"],
    newStaff: {
      id: "add new staff",
      name: "add new staff",
      image:
        "https://icons-for-free.com/iconfiles/png/512/circle+more+plus+icon-1320183136549593898.png",
      location: ""
    }
  }),
  computed: {
    ...mapGetters(["getFarmLabel"]),
    console: () => console
  },
  methods: {
    async onCreateStaff() {
      this.dialog = false;
      const payload = {
        // TODO need validate data
        name: this.name,
        email: this.email,
        password: this.password,
        dateOfBirth: this.date,
        role: 2,
        phonenumber: this.phonenumber,
        image:
          this.image !== [] ? this.image : "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        farmId: this.farm
      };
      let formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }
      //  Create new staff
      try {
        let response = await axios.post("http://localhost:3000/users/createStaff", formData);
        if (response.status === 201) {
          // create successfully
          this.$store.dispatch("validateToken");
          this.resetParameter();
          return true;
        } else return false;
      } catch (error) {
        return false;
      }
    },
    resetParameter() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.dateOfBirth = "";
      this.phonenumber = "";
      this.farmId = "";
    }
  }
};
</script>
