<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-alert color="error" :value="error" icon="warning"
                >The Email or the password are incorrect.</v-alert
              >
              <v-text-field
                v-model="email"
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn to="/signup" rounded color="indigo" dark>Sign up</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="primary" dark @click="loginUser">
              Login
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data: () => ({
    email: "",
    password: "",
    error: false
  }),
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      this.login({
        email: this.email,
        password: this.password
      }).then((success) => {
        if (success) this.$router.push("/");
        else this.error = true;
      });
    }
  }
};
</script>
