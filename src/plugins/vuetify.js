import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@/assets/css/vuetify.scss';

Vue.use(Vuetify);
const opts = {
  theme: {
    options: {
      customProperty: true,
    },
    themes: {
      dark: {
        background: '#292930'
      },
    },
    light: true,
  },
};
export default new Vuetify(opts);
