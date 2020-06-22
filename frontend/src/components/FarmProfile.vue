<template>
  <v-container fluid>
    <v-col cols="24">
      <v-card>
        <v-img v-bind:src="this.data.image" max-height="225" class="grey darken-4"></v-img>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-5">
        <h2>Farm : {{this.data.name}}</h2>
        <v-col>
          <p class="mb-0">Location : {{this.data.location}}</p>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="6">
              <p v-if="this.data.staffs" class="mb-0">Number of staffs: {{this.data.staffs.length}}</p>
            </v-col>
            <v-col cols="6">
              <p v-if="this.data.crops" class="mb-0">Number of crops: {{this.data.crops.length}}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="getUserInfo.role === 1">
          <v-row justify="end">
            <v-btn large color="success" class="mx-2">Edit</v-btn>
            <v-btn large color="error" class="mx-2" @click="openDeleteDialog">Delete</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
    <DeleteDialog :dialog="dialog.deleteDialog" :actionUrl="deleteUrl" objectName="Farm"></DeleteDialog>
  </v-container>
</template>

<script>
import DeleteDialog from "./DeleteDialog";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "FarmProfile",
  data: () => ({}),
  props: {
    data: Object
  },
  computed: {
    deleteUrl() {
      return `http://localhost:3000/farms/${this.data._id}`;
    },
    ...mapState({
      dialog: (state) => state.DialogModule
    }),
    ...mapGetters(["getUserInfo"])
  },
  components: {
    DeleteDialog
  },
  methods: {
    ...mapActions(["openDeleteDialog", "openEditDialog"])
  }
};
</script>
