<template>
  <div class="container">
    <ul class="player-sensors">
      <li v-for="(sensorId, index) in playerSensorIds" :key="sensorId" class="box has-background-info box-player-sensor">
        <div class="level">
          <p class="level-left"><strong>{{ playerNames[index] }}</strong> ({{ sensorId }})</p>
          <p class="level-right button">{{ startMessage }}</p>
        </div>
      </li>
      <li v-if="playerSensorIds.length == 0" class="box has-background-warning">
        <div class="level">
          <p class="level-left"><strong>Waiting for {{ playerNames[0] }}.</strong></p>
          <p class="level-right button is-dark">Press button to join</p>
        </div>
      </li>
      <li v-if="playerSensorIds.length < 2" class="box has-background-warning">
        <div class="level">
          <p class="level-left"><strong>Waiting for {{ playerNames[1] }}.</strong></p>
          <p class="level-right button is-dark">Press button to join</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'PlayerSensorList',
  props: ['playerSensorIds', 'startMessage'],
  data() {
    return {
      playerNames: this.$store.state.playerNames
    }
  }
}

</script>

<style>
  .box.box-player-sensor, .box.box-player-sensor strong {
    color: #fff;
  }
</style>
