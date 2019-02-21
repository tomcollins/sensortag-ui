<template>
  <div class="speedometer">
      <svg class="speedometer-svg" xmlns="http://www.w3.org/2000/svg">
          <circle class="circle-outline-curves circle circle-outline" cx="50%" :cy=circleY></circle>
          <circle class="circle-low circle range" cx="50%" :cy=circleY stroke="#FDE47F"></circle>
          <circle class="circle-avg circle range" cx="50%" :cy=circleY stroke="#7CCCE5"></circle>
          <circle class="circle-high circle range" cx="50%" :cy=circleY stroke="#E04644"></circle>
          <circle class="circle-mask circle" cx="50%" :cy=circleY stroke="#ff0000"></circle>
          <circle class="circle-outline-ends circle circle-outline" cx="50%" :cy=circleY></circle>
          <!-- <circle class="X" cx="50%" :cy=circleY r="30" fill="red"></circle> -->
      </svg>
<!--       <svg class="speedometer-needle" xmlns="http://www.w3.org/2000/svg">
        <g class="speedometer-needle-g">
          <circle class="speedometer-needle-circle" cx="50%" cy="147px" r="10" stroke="#000000"></circle>
          <polygon points="12,0 16,5 19,144 3,144 8,5, 12,0" fill="#000000" stroke="none" />
          <circle class="speedometer-needle-circle" cx="50%" cy="147px" r="4" fill="#ffffff"></circle>
        </g>
      </svg> -->
      <img class="speedometer-needle" src="svg/needle-2.svg">
  </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'


const r = 140;
const cf = 2 * Math.PI * r;
const semi_cf = cf / 2;
const semi_cf_1by3 = semi_cf / 3;
const semi_cf_2by3 = semi_cf_1by3 * 2;


// var currentRotation;
const tweenDuration = 100;

const updateCircles = () => {
  var circles = document.querySelectorAll('.circle');
  var total_circles = circles.length;
  for (var i = 0; i < total_circles; i++) {
      circles[i].setAttribute('r', r);
  }
}

const setStrokeDashArray = (selector, value) => {
  document.querySelectorAll(selector).forEach(item => {
    item.setAttribute('stroke-dasharray', value);
  });
}

const addStroke = ()  => {
  setStrokeDashArray('.circle-outline-curves', semi_cf + "," + cf);
  setStrokeDashArray('.circle-low', semi_cf + "," + cf);
  setStrokeDashArray('.circle-avg', semi_cf_2by3 + "," + cf);
  setStrokeDashArray('.circle-high', semi_cf_1by3 + "," + cf);
  setStrokeDashArray('.circle-outline-ends', 2 + "," + (semi_cf - 2));
}

const setNeedleRotation = (value, element) => {
  // console.log('setNeedleRotation', value);
  var needle =  element.querySelector(".speedometer-needle");
  needle.style.transform = 'rotate(' + value + 'deg)';
};

const setPercentage = (percentage, component) => {
  var mask = component.$el.querySelector(".circle-mask");
  // var meter_value = semi_cf - ((percentage * semi_cf) / 100);
  // mask.setAttribute("stroke-dasharray", meter_value + "," + cf);

  var targetRotation = {
    percentage: percentage,
    degrees: 270 + ((percentage * 180) / 100)
  };

  if (component.currentRotation == undefined) {
    setNeedleRotation(targetRotation, component.$el);
    component.currentRotation = {
      percentage: percentage,
      degrees: targetRotation.degrees
    };
  } else if (component.currentRotation.percentage != targetRotation.percentage) {
    if (component.needleTween) {
      component.needleTween.stop();
    }

    component.needleTween = new TWEEN.Tween(component.currentRotation)
          .to(targetRotation, tweenDuration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(function() {
            var meter_value = semi_cf - ((component.currentRotation.percentage * semi_cf) / 100);
            mask.setAttribute("stroke-dasharray", meter_value + "," + cf);
            setNeedleRotation(component.currentRotation.degrees, component.$el);
          })
          .start();
  }
  // document.querySelector(".speedometer-needle-g").setAttribute('transform', transformNeedle);
  // document.querySelector(".speedometer-needle-g").transform = transformNeedle;
}

// @todo pass in or get from vuex
const maxSpeed = 100;

export default {
  name: 'Speedomoter',
  props: ['speed'],
  data: () => {
    return {
      circleY: '30px',
      needleTween: null,
      currentRotation: null
    }
  },
  watch: {
    speed: {
      immediate: true,
      handler(newValue) {
        if (!this.$el) {
          return;
        }
        setPercentage(parseInt((newValue/maxSpeed)*maxSpeed), this);
      }
    }
  },
  mounted() {
    //updateMeter();
    updateCircles();
    addStroke();
    setPercentage(0, this);
  }
}
</script>

<style>
.meter_needle {
  
}
.speedometer {
  position: relative;
  width: 380px;
  height: 200px;
  /*margin: 50px auto;*/
  border: 0px solid #333;
}
.speedometer-svg {
  border: 0px solid #00ff00;
  width: 100%; 
  height: 100%;
  transform: rotateX(180deg);
}
.speedometer-svg .circle {
  fill: none;
}
.speedometer-svg .circle-outline {
  stroke: #9a9a9a;
  stroke-width: 47;
}

.speedometer-svg .circle-mask {
  stroke: #F1F1F1;
  stroke-width: 45;
}
.speedometer .range {
  stroke-width: 45;
}

.speedometer-needle-svg {
  border: 1px solid #00ff00;
  width: 24px;
  height: 160px;
  position: absolute;
  /*left: 190px;*/
  /*right: 0;*/
  top: 0;
  left: 0;
  /*transform: rotate(180deg);*/
}
.speedometer .speedometer-needle {
  position: absolute;
  /*left: 190px;*/
  
  top: -3px;
  left: 0;
  right: 0;
  /*height: 70%;*/
  margin: auto;
  transform-origin: center 170px;
  /*orientation fix*/
  /*transform: rotate(270deg);*/
  
  border: 0px solid #0000ff;
}
</style>
