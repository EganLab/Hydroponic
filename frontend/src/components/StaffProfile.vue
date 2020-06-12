<template>
  <v-container fluid>
    <v-col>
      <v-card class="pa-5">
        <v-avatar size="62">
          <v-img v-bind:src="this.data.image" />
        </v-avatar>
        <h2>{{this.data.name}}</h2>
        <v-col>
          <p class="mb-0">Email : {{this.data.email}}</p>
        </v-col>
        <v-col>
          <p class="mb-0">Phone number : {{this.data.phonenumber}}</p>
        </v-col>
        <v-col>
          <p
            v-if="this.data.dateOfBirth"
            class="mb-0"
          >Date of birth : {{this.data.dateOfBirth.slice(0,10)}}</p>
        </v-col>
        <v-col>
          <v-row class="justify-end">
            <v-btn small color="success" class="mx-2" @click="openEditDialog">Edit</v-btn>
            <v-btn small color="error" class="mx-2" @click="openDeleteDialog">Delete</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
    <DeleteDialog :dialog="dialog.deleteDialog" :actionUrl="deleteUrl" objectName="Staff"></DeleteDialog>
    <UpdateStaffDialog :dialog="dialog.editDialog" :data="data"></UpdateStaffDialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DeleteDialog from "./DeleteDialog";
import UpdateStaffDialog from "./UpdateStaffDialog";

export default {
  name: "FarmProfile",
  data: () => ({
    deleteConfirmDialog: false
  }),
  props: {
    data: Object
  },
  components: {
    DeleteDialog,
    UpdateStaffDialog
  },
  computed: {
    deleteUrl() {
      return `http://localhost:3000/users/staff/${this.data._id}`;
    },
    ...mapState({
      dialog: (state) => state.DialogModule
    }),
    console: () => console
  },
  methods: {
    ...mapActions(["openDeleteDialog", "openEditDialog"])
  }
};
</script>
