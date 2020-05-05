<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-flex md8 offset-md2 class="pa-1" @submit.prevent="sendName">
      <v-form style="width:100%">
        <v-text-field
          label="Solo"
          placeholder="Type Your Name"
          v-model="name"
          solo
          ref="name"
        ></v-text-field>
      </v-form>
    </v-flex>

    <v-flex md8 offset-md2 class="pa-1" @submit.prevent="sendMessage">
      <v-form style="width:100%">
        <v-text-field
          label="Solo"
          placeholder="Type Your Message"
          v-model="message"
          solo
          ref="message"
        >
        </v-text-field>
      </v-form>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
export default {
  name: "Tracking",
  props: {
    msg: String
  },
  data() {
    return {
      name: "",
      message: "",
      socket: io("localhost:3000")
    };
  },
  mounted: function() {
    this.socket.on("changeData", (data) => {
      console.log("data", data);
    });
  },
  methods: {
    // with http
    async sendName() {
      if (this.name) {
        let name = {
          name: this.name
        };
        axios
          .post("http://localhost:3000/devices/add", name)
          .then((res) => {
            console.log("res", res);
          })
          .catch((error) => {
            console.log(error);
          });
        this.name = "";
      }
    },
    // with socket
    async sendMessage() {
      if (this.message) {
        let message = {
          handle: this.handle,
          message: this.message
        };
        console.log(message);
        await this.socket.emit("chat", message);
        this.message = "";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
