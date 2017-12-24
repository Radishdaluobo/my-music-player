<template>
<div class="progress-bar-wrapper" ref="progressBarWrapper">
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="process-btn-wrapper" ref="btnWrapper" @touchstart="progressTouchStart" @touchmove="progressTouchMove" @touchend="progressToucheEnd">
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
      this.touch.initWidth = Number(this.$refs.progress.style.width)
      this.touch.left1 = e.targetTouches[0].pageX
    },
    progressTouchMove(e) {
      this.touch.left2 = e.targetTouches[0].pageX
      this.touch.offsetX = Math.max(this.touch.left2 - this.touch.left1, this.progressBarWidth)
      this.setProcessWidth(this.touch.offsetX)
    },
    progressToucheEnd() {
      this.touch.initiated = false
      // let percentChange = (this.touch.offsetX + this.touch.initWidth) / this.progressBarWidth
      console.log(this.touch.offsetX, this.touch.initWidth, this.progressBarWidth)
    },
    setProcessWidth(progressWidth) {
      this.$refs.progress.style.width = `${progressWidth}px`
      this.$refs.btnWrapper.style.left = `${progressWidth}px`
    }
  },
  created() {
    this.touch = {}
    this.progressBarWidth = 0
  },
  mounted() {

  },
  watch: {
    percent(newPercent) {
      this.progressBarWidth = this.$refs.progressBarWrapper.clientWidth - processBtnWidth
      let progressWidth = this.progressBarWidth * newPercent
      if (!this.touch.initiated) {
        this.setProcessWidth(progressWidth)
      }
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
