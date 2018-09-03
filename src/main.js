import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import setimmediate from 'setimmediate';
import App from './App.vue';
import './registerServiceWorker';
import Storage from './models/Storage';
import './utils/filters';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

const store = Storage.create({ items: {} });
new Vue({
  render: h => h(
    App,
    {
      props: {
        storage: store,
      },
    },
  ),
}).$mount('#app');

