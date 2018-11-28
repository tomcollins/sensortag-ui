<template>
  <section class="section" id="calibrate">
    <div class="container">
        <h1 class="title">Calibrate</h1>

        <div v-if="hasStarted">
          <Display v-bind:prompt="prompt" v-bind:time="time" v-on:timerComplete="timerComplete" />
          <ul>
            <CalibratePlayer v-for="playerSensor in playerSensors" v-bind:key="playerSensor.sensorId" v-bind:playerSensor="playerSensor"></CalibratePlayer>
          </ul>
        </div>

        <div v-else>
          <h2 class="subtitle">
            Calibrate controllers.
          </h2>
          <PlayerSensorList v-bind:playerSensorIds="playerSensorIds" startMessage="Press button to start calibration"></PlayerSensorList>
        </div>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CalibratePlayer from '../components/CalibratePlayer.vue'
import Display from '../components/Display.vue'
import PlayerSensorList from '../components/PlayerSensorList.vue'

const steps = [
  {
    id: 'start',
    prompt: 'Get Ready',
    time: 3
  },
  {
    id: 'test',
    prompt: 'Drive at Full Speed',
    time: 5
  },
  {
    id: 'result',
    prompt: 'Calibration Complete'
  }
];

export default {
  name: 'Calibrate',
  components: {
    Display,
    CalibratePlayer,
    PlayerSensorList
  },
  data() {
    return {
      hasStarted: false,
      currentStep: 0,
      playerSensors: [],
      prompt: '',
      time: undefined
    }
  },
  computed: mapState({
    sensorIds: 'sensorIds',
    playerSensorIds: 'playerSensorIds'
  }),
  sockets: {
    BUTTON_PRESS(sensorId) {
      if (this.hasStarted) {
        return;
      }
      // should this use local computed state???
      var startCalibration = this.$store.state.playerSensorIds.includes(sensorId);
      this.$store.commit('registerPlayer', sensorId);
      if (startCalibration) {
        this.hasStarted = true;
        this.playerSensors = this.$store.state.playerSensorIds.map((sensorId, index) => {
          return {
            playerNo: index + 1,
            sensorId: sensorId,
            acceleration: 0
          };
        });
      }
    },
    ACCELEROMETER_CHANGE(data) {
      if (!this.hasStarted) {
        return;
      }
      var sensorId = data.sensorId;
      var x = data.x;
      var y = data.y;
      // var z = data.z;
      // console.log('ACCELERATION_UPDATE', sensorId, x, y, z);
      this.playerSensors.forEach(playerSensor => {
        if (playerSensor.sensorId == sensorId) {
          playerSensor.acceleration =  Math.max(Math.abs(x), Math.abs(y));//, Math.abs(z));
        }
      });
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < steps.length) {
        var step = steps[this.currentStep];
        this.prompt = step.prompt;
        this.time = step.time;
        this.currentStep++;
      }
    },
    timerComplete() {
      this.nextStep();
    }
  },
  created() {
    this.nextStep();
  }
}
  
</script>

<style>
  #calibrate {
    margin-top: 16px;
  }
  #calibrate .box.box-player, #calibrate .box.box-player strong {
    color: #fff;
  }
</style>
