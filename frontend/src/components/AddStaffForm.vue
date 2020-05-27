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
              <v-text-field label="Legal Staff Name*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password*" type="password" required></v-text-field>
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
              <v-text-field label="Phone Number*" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CardInfo from "@/components/CardInfo.vue";

export default {
  name: "AddStaffForm",
  components: { CardInfo },
  data: () => ({
    dialog: false,
    newStaff: {
      id: "add new staff",
      name: "add new staff",
      image:
        "https://icons-for-free.com/iconfiles/png/512/circle+more+plus+icon-1320183136549593898.png",
      location: ""
    },
    date: new Date().toISOString().substr(0, 10),
    menu: false
  })
};
</script>