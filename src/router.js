import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start.vue'
import Game from './views/Game.vue'
import Calibrate from './views/Calibrate.vue'

import store from './store/index.js'

Vue.use(Router)

const beforeEnter = (to, from, next) => {
  store.commit('clearPlayers');
  next();
}

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start,
      beforeEnter
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      beforeEnter: (to, from, next) => {
        if (store.state.playerSensorIds.length > 0) {
          next();
        } else {
          next(false);
          router.push('/');
        }
      }
    },
    {
      path: '/calibrate',
      name: 'calibrate',
      component: Calibrate,
      beforeEnter
    }
  ]
});

export default router;