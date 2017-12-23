<template>
<div class="progress-bar-wrapper" ref="progressBarWrapper">
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="process-btn-wrapper" ref="btnWrapper" @touchstart="progressTouchStart" @touchmove="progressTouchMove" @toucheend="progressToucheEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
const processBtnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {

  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.left1 = e.targetTouches[0].pageX
      console.log('a', this.touch.left1)
    },
    progressTouchMove(e) {
      this.touch.left2 = e.targetTouches[0].pageX
      console.log('b', this.touch.left2)
      this.touch.offsetX = this.touch.left2 - this.touch.left1
      console.log(this.touch.offsetX)
    },
    progressToucheEnd() {
      this.touch.initiated = false
    }
  },
  created() {
    this.touch = {}
  },
  mounted() {

  },
  watch: {
    percent(newPercent) {
      const progressBarWidth = this.$refs.progressBarWrapper.clientWidth - processBtnWidth
      let progressWidth = progressBarWidth * newPercent
      this.$refs.progress.style.width = `${progressWidth}px`
      this.$refs.btnWrapper.style.left = `${progressWidth}px`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.progress-bar-wrapper
    flex: 1
    .progress-bar
        height:30px
        display: flex;
        align-items: center;
        .bar-inner
            height: 4px
            width:100%
            background :$color-background-d
            position :relative
            .progress
                position :absolute
                top: 0
                left: 0
                height:100%
                background : $color-theme
            .process-btn-wrapper
                position :absolute
                top: -6px
                .progress-btn
                    box-sizing :border-box
                    width:16px;
                    height:16px;
                    background:$color-theme
                    border: 3px solid $color-text
                    border-radius :50%
</style>
