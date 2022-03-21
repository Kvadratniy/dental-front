<template>
  <div>
    {{ user }}
  </div>
</template>

<script lang="ts">
import container from '../../di';
import {
  UsersApi,
  USERS_API_SERVICE_ID,
} from '../../core/api/users';
import { defineComponent, onMounted, onUpdated, ref, watch } from '@vue/composition-api';
import { useRouter } from '@/router/composition';

export default defineComponent({

  setup(param, { root }) {
    const router = useRouter();
    const user = ref<any>({});
    const api = container.get<UsersApi>(USERS_API_SERVICE_ID);

    const loadUser = async (id) => {
      user.value = await api.getUserById(id);
    }

    watch(() => root.$route.params.id, (value) => {
      loadUser(value)
    }, { immediate: true })

    return {
      user,
      router
    }
  }

});
</script>

<style>

</style>