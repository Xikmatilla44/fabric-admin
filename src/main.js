import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import { router } from './_helpers';

import BootstrapVue from 'bootstrap-vue'
//import { BJumbotron } from 'bootstrap-vue'
import vuetify from './plugins/vuetify'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./_helpers/vee-validate";
//import { Receipt, ReceiptItem, ReceiptSummary } from 'vue-receipt-component';
import { Receipts, ReceiptItems, ReceiptSummary } from 'vue-receipt-component';
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://localhost:8080', {
  store: store,
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})


Vue.use(BootstrapVue)
//Vue.component('b-jumbotron', BJumbotron)
//Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.component('receipts', Receipts);
Vue.component('receipt-items', ReceiptItems);
Vue.component('receipt-summary', ReceiptSummary);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
