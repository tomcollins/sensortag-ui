<template>
  <section class="section" id="calibrate">
    <div class="container">
      <Display ref="display" v-bind:prompt="prompt" v-on:timerComplete="timerComplete" />
      <div class="container">
        <ul>
          <GamePlayer v-for="playerSensor in playerSensors" v-bind:key="playerSensor.sensorId" v-bind:playerSensor="playerSensor"></GamePlayer>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import MovingAverage from 'moving-average';
import Display from '../components/Display.vue'
import GamePlayer from '../components/GamePlayer.vue'

const maxSpeed = 100;
const gameLoopIntervalFrequency = 100;
const movingAverageTimeInterval = 1500;

const steps = {
  start: {
    id: 'start',
    prompt: 'Get Ready!',
    time: 10 
  },
  game: {
    id: 'game',
    prompt: 'Go!',
    time: 30
  },
  complete: {
    id: 'complete',
    prompt: 'Game Complete'
  }
};

export default {
  name: 'Game',
  components: {
    Display,
    GamePlayer
  },
  data() {
    return {
      prompt: 'PROMPT',
      time: 0,
      playerSensors: [],
      hasStarted: false,
      gameLoopIntervalId: 0
    }
  },
  computed: mapState({
    playerSensorIds: 'playerSensorIds'
  }),
  sockets: {
    ACCELEROMETER_CHANGE(data) {
      if (!this.hasStarted) {
        return;
      }
      var sensorId = data.sensorId;
      var x = data.x;
      var y = data.y;
      this.playerSensors.forEach(playerSensor => {
        if (playerSensor.sensorId == sensorId) {
          playerSensor.acceleration =  Math.max(Math.abs(x), Math.abs(y));
          var accelerationRatio = playerSensor.acceleration / playerSensor.maxAcceleration;
          // playerSensor.speed = parseInt(Math.min(maxSpeed, accelerationRatio * maxSpeed));
          var speed = parseInt(Math.min(maxSpeed, accelerationRatio * maxSpeed));
          playerSensor.movingAverage.push(Date.now(), speed);
          playerSensor.speed = parseInt(playerSensor.movingAverage.movingAverage());
        }
      });
    }
  },
  methods: {
    gameLoop() {
      this.playerSensors.forEach(playerSensor => {
        if (!playerSensor.active) {
          return;
        }
        if (this.hasStarted) {
          playerSensor.score += playerSensor.speed;
        }
      });
    },
    resetPlayerSensors() {
      this.playerSensors.forEach(playerSensor => {
        playerSensor.active = true;
      });
    },
    countdownFrom(time) {
      this.$refs.display.countdownFrom(time);
    },
    timerComplete() {
      if (this.step.id == 'start') {
        this.step = steps.game;
        this.prompt = this.step.prompt;
      } else if (this.step.id == 'game') {
        this.hasStarted = false;
        this.step = steps.complete;

        var winner = this.playerSensors[0];
        if (this.playerSensors.length > 1) {
          winner = this.playerSensors[0].score > this.playerSensors[1].score ? this.playerSensors[0] : this.playerSensors[1];
        }
        this.prompt = winner.playerName + " wins!";

        return;
      }

      this.resetPlayerSensors();

      this.countdownFrom(this.step.time);
      var _this = this;
      clearInterval(this.gameLoopIntervalId);
      this.gameLoopIntervalId = setInterval(() => {
        _this.gameLoop();
      }, gameLoopIntervalFrequency);
    }
  },
  created() {
    this.playerSensors = this.playerSensorIds.map((playerSensorId, index) => ({
      playerNo: index + 1,
      playerName: this.$store.state.playerNames[index],
      sensorId: playerSensorId,
      active: false,
      score: 0,
      acceleration: 0,
      maxAcceleration: this.$store.state.sensorMaxAcceleration[playerSensorId],
      speed: 0,
      movingAverage: MovingAverage(movingAverageTimeInterval)
    }));
  },
  mounted() {
    this.hasStarted = true;
    this.step = steps.start;
    this.prompt = this.step.prompt;
    // this accesses this.$refs which are not available during 'created'
    this.countdownFrom(steps.start.time);
  }
}
  
</script>

<style>
  #game {
  }
</style>
