<template>
  <div class="container display">
    <p class="display-prompt">{{ prompt }}</p>
    <p class="display-time has-background-black has-text-white">{{ currentTime }}</p>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

const timerIntervalDuration = 1000;

export default {
  name: 'Display',
  props: ['prompt'],
  data() {
    return {
      timeIntervalId: undefined,
      currentTime: 0,
      time: 0
    }
  },
  // watch: {
  //   time(newValue) {
  //     console.log('time', typeof newValue, newValue);
  //     if (typeof newValue == 'number') {
  //       console.log('NEW TIME');
  //       this.currentTime = newValue;
  //       this.startTimer(this.currentTime);
  //     } else {
  //       this.currentTime = '';
  //     }
  //   },
  //   currentTime() {
  //     //this.startTimer(newValue);
  //   }
  // },
  // mounted() {
  //   if (this.time > 0) {
  //     this.currentTime = this.time;
  //     this.startTimer(this.currentTime);
  //   }
  // },
  methods: {
    countdownFrom(time) {
      this.time = time;
      this.currentTime = time;
      this.startTimer();
    },
    startTimer() {
      clearInterval(this.timeIntervalId);
      var vm = this;
      console.log('startTimer', vm.currentTime);
      this.timeIntervalId = setInterval(() => {
        if (vm.currentTime == 0) {
          clearInterval(vm.timeIntervalId);
          vm.$emit('timerComplete')
        } else {
          vm.currentTime --;
        }
      }, timerIntervalDuration);
    }
  }
}
  
</script>

<style>
  .display {
    margin: 16px 0;
    padding: 16px;
    height: 100px;
    text-align: center;
  }
  .display-prompt {
    font-size: 3.8em;
    font-weight: bold;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 16px;
  }
  .display-time {
    font-size: 3.8em;
    font-weight: bold;
    width: 90px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    right: 16px;
  }
  .display-sign img {
    width: 200px;
    height: auto;
  }
</style>
