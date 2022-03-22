<template>
  <div :class="$style.app">
    <v-app light>
    <v-main>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          :class="$style.form"
        >
          <div :class="$style.logo"></div>
          <div>
            <v-text-field
              dark
              v-model="email"
              :counter="10"
              label="E-mail"
              autocomplete="username"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              autocomplete="new-password"
              outlined
              dark
            ></v-text-field>
            <v-btn
              depressed
              block
              x-large
              outlined
              color="#DF9F46"
              @click="login(email, password)"
            >
              Войти
            </v-btn>
          </div>
        </v-form>
    </v-main>
  </v-app>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import useAuth from './useAuth';

export default defineComponent({

  setup() {
    const valid = ref(true);
    const email = ref('');
    const password = ref('');

    const {
      login,
    } = useAuth();

    return {
      login,
      valid,
      password,
      email,
    }
  }
});
</script>

<style module>
.form {
  max-width: 400px;
  width: 90%;
  height: 90%;
  gap: 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
}
.logo {
  width: 100%;
  height: 150px;
  background-image: url('../../assets/images/logo.png');
  background-size: contain;
  background-position: center;
}

.app :global .v-main__wrap {
  background: var(--color-dark);
}

</style>