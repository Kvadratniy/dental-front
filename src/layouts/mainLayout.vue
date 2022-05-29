<template>
  <v-app :key="key" :class="$style.app">
    <div :class="$style.menu">
      <div>
        <!-- <v-icon color="#DF9F46">mdi-account</v-icon>
        {{ user.firstName }} {{ user.lastName }} -->
      </div>
      <v-app-bar-nav-icon color="#fff" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="768"
      :class="$style.nav"
      app
    >
      <div :class="$style.logo"></div>
      <div :class="$style.line"></div>
      <v-list
        dense
        nav
      >
        <v-list-item
          dark
          v-for="item in activeLinks"
          :key="item.title"
          link
          @click="navigate(item.name)"
        >
          <v-list-item-icon size="sm">
            <v-icon color="#DF9F46">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :class="$style.title">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div style="display:flex; justify-content: space-between; align-items: center;">
          <div :class="$style.userName">
          <v-icon color="#DF9F46">mdi-account</v-icon>
            <span>{{ user.firstName }} {{ user.lastName }}</span>
            
          </div>
          <v-icon :class="$style.logout" @click="logout(); isAuthenticated = false;">mdi-logout</v-icon>
        </div>
      </template>
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
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@vue/composition-api';
import { useRouter } from '@/router/composition';
import { user, isAuthenticated } from '@/core/auth';
import useAuth from '@/features/auth/useAuth';

 export default {
  setup(props, { root }) {
    const key = ref(1);
    const {
      logout,
    } = useAuth();
    const drawer = ref(true);
    const router = useRouter();
    const width = computed(() => window.innerWidth);
    const items = ref([
      { title: 'Визиты', icon: 'mdi-view-dashboard', name: 'sales', roles: ['director', 'administrator']},
      { title: 'Скидки', icon: 'mdi-bookmark', name: 'discounts', roles: ['director']},
      { title: 'Пользователи', icon: 'mdi-account-supervisor', name: 'users', roles: ['director']},
      { title: 'Услуги', icon: 'mdi-database', name: 'services', roles: ['director']},
      { title: 'Аккаунт', icon: 'mdi-archive', name: 'account', roles: ['manager', 'director', 'administrator']},
    ]);

    const navigate = (name) => {
      if (width.value < 769) {
        if (name === root.$route.name) return drawer.value = !drawer.value;
      }

      router.push({ name });
    };

    const activeLinks = computed(() => items.value.filter(({ roles }) => user.value.role && roles.includes(user.value.role)));

    return {
      width,
      key,
      drawer,
      navigate,
      activeLinks,
      user,
      logout,
      isAuthenticated,
    }
  },
}
</script>

<style module lang="scss">
.app {
  overflow: hidden;
}

.app :global {
  .container {
    height: 100%;
  }

  .theme--light.v-navigation-drawer {
    padding: 20px 20px 13px 20px;
    box-shadow: 10px 20px 27px rgb(0 0 0 / 5%);
    background-color: var(--color-dark);
  }

  .theme--dark.v-application {
    background-color: var(--color-dark);
  }

  .v-list-item__title {
    font-family: 'Montserrat';
    color: #FFF;
    font-weight: 600 !important;
  }

  .v-list--dense .v-list-item .v-list-item__icon, .v-list-item--dense .v-list-item__icon {
    margin-right: 20px !important;
  }
}

.logo {
  height: 90px;
  background-image: url('../assets/images/logo.png');
  background-size: contain;
  background-position: center;
  margin-bottom: 20px;
}

.line {
  background: #DF9F46;
  width: 100%;
  height: 1px;
  margin-bottom: 15px;
}

.userName {
  color: #FFF;
  font-size: 13px;
}

.logout {
  cursor: pointer;
  color: #DF9F46 !important;

  &:hover {
    color: #ebdfcf !important;
  }
}

.menu {
  display: none;
  width: 100%;
  padding: 10px 10px;
  align-items: center;
  justify-content: space-between;
  color: #FFF;
  background-color: var(--color-dark);
}

@media (max-width: 768px) {
  .menu {
    display: flex;
  }

  .nav {
    width: 100% !important;
  }
}
</style>