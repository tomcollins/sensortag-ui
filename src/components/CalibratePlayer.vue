<template>
  <li class="calibrate-player">
    <p>Player: {{ playerSensor.playerNo }}</p>
    <p>SensorId: {{ playerSensor.sensorId }}</p>
    <p>Acceleration: {{ playerSensor.acceleration }}</p>
    <p>Max Acceleration: {{ maxAcceleration }}</p>
    <Accelerometer v-bind:acceleration="playerSensor.acceleration" v-bind:maxAcceleration="maxAcceleration"></Accelerometer>
  </li>
</template>

<script>
// import { mapState } from 'vuex'
import Accelerometer from '../components/Accelerometer.vue'

export default {
  name: 'CalibratePlayer',
  components: {
    Accelerometer
  },
  computed: {
    acceleration() {
      return this.playerSensor.acceleration;
    },
    maxAcceleration: {
      get() {
        return this.$store.state.sensorMaxAcceleration[this.playerSensor.sensorId];
      },
      set(newValue) {
        console.log('maxAcceleration', newValue);
        this.$store.commit('setMaxAcceleration', {
          sensorId: this.playerSensor.sensorId,
          value: newValue
        });
      }
    }
  },
  watch: {
    acceleration(newValue) {
      if (newValue > this.maxAcceleration) {
        this.maxAcceleration = newValue;
      }
    }
  },
  props: ['playerSensor']
}
  
</script>

<style>

</style>
