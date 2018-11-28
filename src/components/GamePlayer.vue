<template>
  <li class="game-player">
    <Speedometer :speed="playerSensor.speed"/>
    <p>Player: {{ playerSensor.playerNo }}</p>
    <p>SensorId: {{ playerSensor.sensorId }}</p>
    <p>Acceleration: {{ playerSensor.acceleration }}</p>
    <p>Max Acceleration: {{ playerSensor.maxAcceleration }}</p>
    <p>Speed: {{ playerSensor.speed }}</p>
    <p>Speed Limit Exceeded Count: {{ playerSensor.speedLimitExceededCount }}</p>
    <p>Active: {{ playerSensor.active }}</p>
    <p>Penalty Points: {{ playerSensor.penaltyPoints }}</p>
    <!-- <Accelerometer v-bind:acceleration="playerSensor.acceleration" v-bind:maxAcceleration="playerSensor.maxAcceleration"></Accelerometer> -->
    
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

</style>
