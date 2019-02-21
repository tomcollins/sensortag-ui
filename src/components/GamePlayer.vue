<template>
  <li class="game-player">
    <p class="title player-no">{{ playerSensor.playerName }}</p>
    <Speedometer :speed="playerSensor.speed"/>
    <p class="title score has-background-info has-text-white">{{ playerSensor.score }}</p>
    <!-- <p>SensorId: {{ playerSensor.sensorId }}</p> -->
    <p>Acceleration: {{ playerSensor.acceleration }}</p>
    <!-- <p>Max Acceleration: {{ playerSensor.maxAcceleration }}</p> -->
    <!-- <p>Speed: {{ playerSensor.speed }}</p> -->
    <!-- <p>Active: {{ playerSensor.active }}</p> -->
    
  </li>
</template>

<script>
// import { mapState } from 'vuex'
import Speedometer from './Speedometer.vue'

export default {
  name: 'GamePlayer',
  components: {
    Speedometer
  },
  props: ['playerSensor']
}
  
</script>

<style>
.game-player {
  width: 380px;
   display:block;
   float: left;
}
.game-player .player-no {
  text-align: center;
}
.game-player .score {
  width: 160px;
  padding: 2px 10px;
  text-align: center;
  position: relative;
  left: 110px;
}
</style>
