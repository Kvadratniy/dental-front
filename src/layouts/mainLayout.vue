<template>
  <v-app :class="$style.app">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item color="success" dark>
        <v-list-item-content>
          <v-list-item-title >
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
            <v-list-item-title :class="$style.title">{{ item.title }}</v-list-item-title>
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
      { title: 'Скидки', icon: 'mdi-bookmark', name: 'discounts' },
      { title: 'Пользователи', icon: 'mdi-account-supervisor', name: 'users' },
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
    padding: 33px 20px 13px 20px;
    box-shadow: 10px 20px 27px rgb(0 0 0 / 5%);
    background-color: var(--color-dark);
  }

  .theme--dark.v-application {
    background-color: var(--color-dark);
  }

  .v-list-item__title {
    font-family: 'Montserrat';
    color: #FFF;
    // color: var(--color-dark);
  }
}

</style>