<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200" />
    </v-col>

    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">Welcome to GoHydroponic</h1>

      <p class="subheading font-weight-regular">
        GoHydroponic is the best platform for Hydroponic
        <br />Join with us !
      </p>
    </v-col>

    <v-col cols="12">
      <v-row justify="center">
        <v-col cols="6">
          <h2 class="headline font-weight-bold mb-3">Developed By</h2>
          <v-row justify="space-around">
            <v-col>
              <v-avatar size="160">
                <img
                  src="https://schooler.sun-asterisk.com/storage/images/avatar/student/5e3a3e73e9985.jpg"
                  alt="hoang"
                />
              </v-avatar>
              <h1>Đỗ Đức Hoàng</h1>
            </v-col>

            <v-col>
              <v-avatar size="160">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/hunter-31765.appspot.com/o/kien.png?alt=media&token=5c94285b-eb80-440a-9190-8669f6205e7d"
                  alt="kien"
                />
              </v-avatar>
              <h1>Nguyễn Đức Kiên</h1>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
};
</script>
