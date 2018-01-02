<template>
<div class="progress-bar-wrapper" ref="progressBarWrapper" @click="progressClick">
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
      // this.touch.initWidth = parseFloat(this.$refs.progress.style.width)
      // 拖动之前进度条的宽度
      this.touch.initWidth = this.$refs.progress.clientWidth
      this.touch.left1 = e.targetTouches[0].pageX
    },
    progressTouchMove(e) {
      // 边界处理
      if (!this.touch.initiated) {
        return
      }
      this.touch.left2 = e.targetTouches[0].pageX
      this.touch.offsetX = this.touch.left2 - this.touch.left1
      const leftPosition = Math.min(Math.max(parseFloat(this.touch.offsetX) + parseFloat(this.touch.initWidth), 0), this.progressBarWidth)
      this.setProcessWidth(leftPosition)
    },
    progressToucheEnd() {
      this.touch.initiated = false
      this._triggerPercent()
    },
    setProcessWidth(progressWidth) {
      this.$refs.progress.style.width = `${progressWidth}px`
      this.$refs.btnWrapper.style.left = `${progressWidth}px`
    },
    progressClick(e) {
      // let left = e.pageX
      // let leftPosition = left - document.documentElement.clientWidth * 0.2
      // let percentChange = leftPosition / this.progressBarWidth
      // const width = e.offsetX || e.originalEvent.offsetX
      // 注意这里getBoundingClientRect的用法
      const rect = this.$refs.progress.getBoundingClientRect()
      const width = e.pageX - rect.left
      const percentChange = width / this.progressBarWidth
      this.$emit('percentChange', percentChange)
    },
    _triggerPercent() {
      // const percent =(this.touch.offsetX + this.touch.initWidth) / this.percentChange
      // touchMove的时候已经调用了setProcessWidth
      // 所以可以直接用以下
      const percent = this.$refs.progress.clientWidth / this.progressBarWidth
      this.$emit('percentChange', percent)
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
      if (!this.touch.initiated && newPercent >= 0) {
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
