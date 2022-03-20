<template>
  <v-app :class="$style.app">
    <router-view />
    <portal-target name="loader" />
  </v-app>
</template>

<script lang="ts">
import { PortalTarget } from 'portal-vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    PortalTarget,
  },
});
</script>

<style module>
.app {
  font-family: var(--font-roboto);
}
</style>
