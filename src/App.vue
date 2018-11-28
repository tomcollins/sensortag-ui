<template>
  <div id="app">
    <NavBar/>
    <router-view/>
    <FooterBar/>
  </div>
</template>



<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import Speedometer from './components/Speedometer.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    FooterBar,
    Speedometer
  }
}
</script>

<!-- <style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}
</style> -->
