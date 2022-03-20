import Vue from 'vue';
import '@/installCompositionApi';
import vuetify from '@/plugins/vuetify';
import '@/di';
import App from '@/App.vue';
import pinia from '@/store';
import router from '@/router/router';
import '@/assets/css/base.css';
import '@/assets/css/global.css';
import '@/assets/styles/app.css'

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  pinia,
  render: (h) => h(App),
}).$mount('#app');
