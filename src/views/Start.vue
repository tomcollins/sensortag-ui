<template>
  <section class="section" id="start">
    <div class="container">
        <h1 class="title">Select Players</h1>
        <PlayerSensorList v-bind:playerSensorIds="playerSensorIds" startMessage="Press button to start game"></PlayerSensorList>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import PlayerSensorList from '../components/PlayerSensorList.vue'

export default {
  name: 'Start',
  components: {
    PlayerSensorList
  },
  data() {
    return {
    }
  },
  computed: mapState({
    sensorIds: 'sensorIds',
    playerSensorIds: 'playerSensorIds'
  }),
  sockets: {
    BUTTON_PRESS(sensorId) {
      console.log('BUTTON_PRESS', sensorId);
      // shouldv this use local computed state???
      var startGame = this.$store.state.playerSensorIds.includes(sensorId);
      this.$store.commit('registerPlayer', sensorId);
      if (startGame) {
        this.$router.push( '/game');
      }
    }
  },
  methods: {
    pingServer() {
      console.log('ping');
      this.$socket.emit('test-send', 'PING!')
    }
  }
}
  
</script>

<style>
  #start {
    margin-top: 16px;
  }
  #start .title {
    font-size: 3.8em;
    font-weight: bold;
  }
</style>
