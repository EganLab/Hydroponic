<template>
  <v-layout align-center justify-center>
    <v-card class="px-3 py-3" width="600">
      <v-form ref="form">
        <v-text-field
          v-model="oldPassword"
          label="Old Password"
          outlined
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          label="New Password"
          outlined
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="newPasswordConfirm"
          :rules="confirmRule"
          label="New Password"
          outlined
          type="password"
          required
        ></v-text-field>
        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
        <v-btn color="warning" @click="changePassword">Change</v-btn>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      confirmRule: [(v) => v === this.newPassword || "New Password confirmation must match"]
    };
  },
  methods: {
    reset() {
      this.oldPassword = "";
      this.newPassword = "";
      this.newPasswordConfirm = "";
    },
    async changePassword() {
      // TODO update error on view
      const data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        newPasswordConfirm: this.newPasswordConfirm
      };
      try {
        const response = await axios.patch("http://localhost:3000/users/changePassword", data);
        if (response.status === 200) {
          let data = {
            user: {},
            token: ""
          };
          localStorage.removeItem("user-token");
          this.$store.commit("UPDATE_USER_INFO", data);
          this.$store.commit("UPDATE_TOKEN", data);
          this.$router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
