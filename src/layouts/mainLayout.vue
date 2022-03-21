<template>
  <v-app :class="$style.app">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item dark>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Dr. Tochiev
          </v-list-item-title>
          <v-list-item-subtitle>
            DENTAL CLUB
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list
        dense
        nav
      >
        <v-list-item
          dark
          v-for="item in items"
          :key="item.title"
          link
          @click="navigate(item.name)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar app dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main light>

      <!-- Provides the application the proper gutter -->
      <v-container fluid >

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { useRouter } from '@/router/composition';

 export default {

  setup() {
    const drawer = ref(true);
    const router = useRouter();
    const items = ref([
      { title: 'Продажи', icon: 'mdi-view-dashboard', name: 'sales' },
      { title: 'Скидки', icon: 'mdi-image', name: 'discounts' },
      { title: 'Пользователи', icon: 'mdi-help-box', name: 'users' },
    ]);

    const navigate = (name) => {
      console.log(name)
      router.push({ name });
    };

    return {
      drawer,
      navigate,
      items,
      right: null,
    }
  },
}
</script>

<style module lang="scss">
.app {
  overflow: hidden;
}

.app :global {
  .theme--light.v-navigation-drawer {
    background-color: var(--color-dark);
  }

  .theme--dark.v-application {
    background-color: var(--color-dark);
  }
}

</style>