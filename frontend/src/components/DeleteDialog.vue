<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Delete {{ objectName }} ?</v-card-title>
      <v-card-text>Are you sure to delete this {{ objectName }} staff. You can't undo this action</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="error" text @click="onDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    dialog: Boolean,
    actionUrl: String,
    objectName: String
  },
  methods: {
    async onDelete() {
      try {
        const response = await axios.delete(this.actionUrl);
        if (response.status === 200) {
          this.$store.dispatch("validateToken");
          this.$store.dispatch("closeDeleteDialog");
          // this.$router.push("/staff/");
          this.$router.push("/" + this.$route.path.split("/")[1]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeDialog() {
      this.$store.dispatch("closeDeleteDialog");
    }
  }
};
</script>

<style>
</style>
