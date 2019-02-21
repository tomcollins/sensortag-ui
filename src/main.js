import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

// UI
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import './plugins/element.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch()
library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// IO
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

// app
import store from './store/index.js'
import router from './router'


import TWEEN from '@tweenjs/tween.js'
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);


Vue.use(Vuex);
Vue.use(Buefy)
// Vue.use(ElementUI);

const SocketInstance = io.connect('http://localhost:3000');
Vue.use(new VueSocketIO({
    // debug: true,
    connection: SocketInstance
}));

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

