<template>
  <v-app :class="$style.app">
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>Page title</v-toolbar-title> -->

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {

}
</script>

<style module>
.app {
  overflow: hidden;
}
</style>