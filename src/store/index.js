import Vue from 'vue'
import Vuex from 'vuex'
// import sensors from './modules/sensors'
import { createSocketioPlugin } from 'vuex-socketio-plugin'
// import * as io from 'socket.io-client'


// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const defaultMaxAcceleration = 5.6;

export default new Vuex.Store({
  state: {
    isConnected: false,
    sensorIds: [],
    playerSensorIds: [],
    playerNames: ['Tom', 'Player 2'],
    sensorMaxAcceleration: {}
  },
  plugins: [createSocketioPlugin('http://localhost:3000')],
  modules: {
    // sensors
  },
  mutations: {
    SOCKET_CONNECT(state) {
      console.log('SOCKET_CONNECT');
      state.isConnected = true;
    },
    SOCKET_DISCONNECT(state) {
        console.log('SOCKET_DISCONNECT');
        state.isConnected = false;
        state.sensorIds = [];
    },
    SOCKET_UPDATE_SENSORS(state, { data }) {
        console.log('SOCKET_UPDATE_SENSORS', data[0]);
        this.state.sensorIds = data[0];
    },
    // SOCKET_BUTTON_PRESS(state, { data }) {
    //     console.log('SOCKET_BUTTON_PRESS', data);
    //     // this.sensorIds = sensorIds;
    // },
    clearPlayers() {
        console.log('clearPlayers');
        this.state.playerSensorIds = [];
    },
    registerPlayer(state, sensorId) {
        console.log('registerPlayer', sensorId);
        if(!this.state.playerSensorIds.includes(sensorId)) {
            console.log('registerPlayer - new', sensorId);
            this.state.playerSensorIds.push(sensorId);
            if (undefined == this.state.sensorMaxAcceleration[sensorId]) {
              //this.state.sensorMaxAcceleration[sensorId] = defaultMaxAcceleration;
              Vue.set(this.state.sensorMaxAcceleration, sensorId, defaultMaxAcceleration)
            }
        }
    },
    setMaxAcceleration(state, payload) {
        console.log('store.setMaxAcceleration', payload.sensorId, payload.value);
        this.state.sensorMaxAcceleration[payload.sensorId] = payload.value;
    }
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})