<template>
  <nav class="navbar is-fixed-bottom has-background-grey" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item has-text-white">
        <strong>Sensors</strong>
      </router-link>
    </div>
    <div class="navbar-start">
      <div class="navbar-item">
        <div id="connectivity-status-sensors">
          <ul>
            <li v-for="(sensorId, index) in sensorIds" :key="sensorId">
              <b-tooltip :label="sensorId" position="is-top">
                <p>{{ index + 1 }}</p>
              </b-tooltip>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="connectivity-status-connected">
      <div v-if="isConnected">
        <p>Connected</p>
        <span class="icon has-text-success">
          <i class="fas fa-check-square"></i>
        </span>
      </div>
      <div v-else>
        <p>No Connection</p>
        <span class="icon has-text-warning">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'footer-bar',
  components: {
  },
  computed: mapState({
    isConnected: state => state.isConnected,
    sensorIds: state => state.sensorIds.map(sensorId => String(sensorId))
  }),
}
</script>

<style>
/*  #connectivity-status-sensors {
    position: absolute;
    top: 10px;
    left: 8px;
  }*/
  #connectivity-status-sensors ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  #connectivity-status-sensors li {
    display: inline-block;
    background: #fff;
    color: #000;
    width: 32px;
    height: 32px;
    border-radius: 5px;
    text-align: center;
    margin-right: 10px;
  }
  #connectivity-status-sensors li p {
    padding: 5px 2px;

  }
  #connectivity-status-connected {
    position: absolute;
    top: 12px;
    right: 16px;
  }
  #connectivity-status-connected span {
    display: block;
    float: left;
  }
  #connectivity-status-connected p {
    display: block;
    float: left;
    color: #efefef;
    padding-right: 8px;
  }
</style>
