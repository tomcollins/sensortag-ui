<template>
  <ul class="player-sensors">
    <li v-for="(sensorId, index) in playerSensorIds" :key="sensorId" class="box has-background-info box-player-sensor">
      <div class="level">
        <p class="level-left"><strong>Player {{ index + 1 }}</strong> ({{ sensorId }})</p>
        <p class="level-right button">{{ startMessage }}</p>
      </div>
    </li>
    <li v-if="playerSensorIds.length == 0" class="box has-background-warning">
      <div class="level">
        <p class="level-left"><strong>Waiting for player one.</strong></p>
        <p class="level-right button is-dark">Press button to join</p>
      </div>
    </li>
    <li v-if="playerSensorIds.length < 2" class="box has-background-warning">
      <div class="level">
        <p class="level-left"><strong>Waiting for player two.</strong></p>
        <p class="level-right button is-dark">Press button to join</p>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'PlayerSensorList',
  props: ['playerSensorIds', 'startMessage']
}

</script>

<style>
  .box.box-player-sensor, .box.box-player-sensor strong {
    color: #fff;
  }
</style>
