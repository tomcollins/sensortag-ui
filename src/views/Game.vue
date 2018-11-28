<template>
  <section class="section" id="calibrate">
    <div class="container">
      <Display ref="display" v-bind:prompt="prompt" v-bind:signImagePath="signImagePath" v-on:timerComplete="timerComplete" />
      <ul>
        <GamePlayer v-for="playerSensor in playerSensors" v-bind:key="playerSensor.sensorId" v-bind:playerSensor="playerSensor"></GamePlayer>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Display from '../components/Display.vue'
import GamePlayer from '../components/GamePlayer.vue'

const maxSpeed = 100;
const gameLoopIntervalFrequency = 100;
const speedLimitExceedToleranceMultiplier = 2;
const penaltyPointIncrement = 3;
const roadConditionDurationSeconds = 10;

const steps = {
  start: {
    id: 'start',
    prompt: 'Get Ready!',
    time: 3
  },
  complete: {
    id: 'complete',
    prompt: 'Game Complete'
  }
};

const roadConditions = [
  {
    id: 'motorway',
    prompt: 'Motorway',
    speedLimit: 70,
    signImagePath: 'svg/sign-70.svg'
  },
  {
    id: 'dual-carriageway',
    prompt: 'Dual Carriageway',
    speedLimit: 50,
    signImagePath: 'svg/sign-50.svg'
  },
  {
    id: 'residential',
    prompt: 'Residential',
    speedLimit: 30,
    signImagePath: 'svg/sign-30.svg'
  },
  {
    id: 'school',
    prompt: 'School',
    speedLimit: 20,
    signImagePath: 'svg/sign-20.svg'
  },
  {
    id: 'race-track',
    prompt: 'Race Track',
    speedLimit: maxSpeed,
    signImagePath: 'src/sign-100.svg'
  }
];

export default {
  name: 'Game',
  components: {
    Display,
    GamePlayer
  },
  data() {
    return {
      prompt: '',
      signImagePath: '',
      time: 0,
      playerSensors: [],
      hasStarted: false,
      roadCondition: undefined,
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
          playerSensor.speed = parseInt(Math.min(maxSpeed, accelerationRatio * maxSpeed));
        }
      });
    }
  },
  methods: {
    gameLoop() {
      var vm = this;
      var speedDifference;
      this.playerSensors.forEach(playerSensor => {
        if (!playerSensor.active) {
          return;
        }
        playerSensor.score += playerSensor.speed;
        speedDifference = playerSensor.speed - vm.roadCondition.speedLimit;
        if (speedDifference > 0) {
          playerSensor.speedLimitExceededCount += speedDifference;
          console.log(playerSensor.speedLimitExceededCount, vm.roadCondition.speedLimit);
          if (playerSensor.speedLimitExceededCount > (vm.roadCondition.speedLimit * speedLimitExceedToleranceMultiplier)) {
            playerSensor.active = false;
            playerSensor.penaltyPoints += penaltyPointIncrement;
          }
        }
      });
    },
    resetPlayersForRoadCondition() {
      this.playerSensors.forEach(playerSensor => {
        playerSensor.active = true;
        playerSensor.speedLimitExceededCount=0;
      });
    },
    countdownFrom(time) {
      this.$refs.display.countdownFrom(time);
    },
    setRoadCondition(roadCondition) {
      this.roadCondition = roadCondition;
      this.resetPlayersForRoadCondition();
      this.prompt = roadCondition.prompt;
      this.signImagePath = roadCondition.signImagePath;
      // this.countdownFrom(Math.ceil(Math.random() * roadConditionDurationSeconds));
      this.countdownFrom(roadConditionDurationSeconds);

      var vm = this;
      clearInterval(this.gameLoopIntervalId);
      this.gameLoopIntervalId = setInterval(() => {
        vm.gameLoop();
      }, gameLoopIntervalFrequency);
    },
    randomRoadCondition() {
      var randomIndex = Math.floor(Math.random()*roadConditions.length);
      var roadCondition = roadConditions[randomIndex];
      this.setRoadCondition(roadCondition);
    },
    timerComplete() {
      if (!this.hasStarted) {
        this.hasStarted = true;
      }
      this.randomRoadCondition();
    }
  },
  created() {
    this.playerSensors = this.playerSensorIds.map((playerSensorId, index) => ({
      playerNo: index + 1,
      sensorId: playerSensorId,
      active: false,
      score: 0,
      penaltyPoints: 0,
      acceleration: 0,
      maxAcceleration: this.$store.state.sensorMaxAcceleration[playerSensorId],
      speed: 0,
      speedLimitExceededCount: 0
    }));
  },
  mounted() {
    this.prompt = steps.start.prompt;
    // this accesses this.$refs which are not available during 'created'
    this.countdownFrom(steps.start.time);
  }
}
  
</script>

<style>
  #game {
  }
</style>
