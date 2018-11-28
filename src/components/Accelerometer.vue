<template>
  <div class="accelerometer">
    <span :style="styleObject"></span>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

const maxWidth = 300;

export default {
  name: 'Accelerometer',
  props: ['acceleration', 'maxAcceleration'],
  data() {
    return {
      styleObject: {
        width: '0px'
      }
    }
  },
  watch: {
    acceleration: {
      immediate: true,
      handler(newValue) {
        var width = Math.min(maxWidth, (newValue / this.maxAcceleration) * maxWidth);
        this.styleObject.width = String(width) + 'px';
      }
    }
  }
}
  
</script>

<style>
  .accelerometer {
    display: block;
    width: 300px;
    height: 32px;
    background: #ccc;
  }
  .accelerometer span {
    display: block;
    width: 0px;
    height: 32px;
    background: red;
  }
</style>
