<template>
<div class="progress-circle">
  <!-- stroke-dasharra周长，stroke-dashoffset 0-314 -->
  <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50"
      fill="transparent"
      :stroke-dasharray="dasharray"
      :stroke-dashoffset="dashoffset"/>
    </svg>
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {
      dasharray: Math.PI * 100
    }
  },
  computed: {
    dashoffset() {
      return Math.PI * 100 * (1 - this.percent)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.progress-circle
  position: relative
  circle
    stroke-width: 8px
    transform-origin: center
    &.progress-background
      transform: scale(0.9)
      stroke: $color-theme-d
    &.progress-bar
      transform: scale(0.9) rotate(-90deg)
      stroke: $color-theme
</style>
