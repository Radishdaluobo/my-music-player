<template>
<div class="player" v-show="playList.length>0">
  <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image" />
      </div>
      <div class="top">
        <div class="back" @click="hideFullScreen">
          <i class="icon-back"></i>
        </div>
        <h2 class="title" v-html="currentSong.name"></h2>
        <h3 class="subtitle" v-html="currentSong.singer"></h3>
      </div>
      <div class="middle" @touchstart.prevent="middleTouchStart" @touchmove.prevent="middleTouchMove" @touchend="middleTouchEnd">
        <div class="middle-l">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd" :class="playRotate">
              <img class="cd-image" :src="currentSong.image" />
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">sdfdfdsfsdfsdf</div>
          </div>
        </div>
        <scroll class="middle-r" ref="lyricList" v-if="currentLyric" :data="currentLyric.lines">
          <div class="lyric-wrapper">
            <div>
              <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}" v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
            </div>
          </div>
        </scroll>
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <b class="dot" :class="{'active':currentShow === 'cd'}"></b>
          <b class="dot" :class="{'active':currentShow === 'lyric'}"></b>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l">{{formateTime(currentTime)}}</span>
          <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
          <div class="time time-r">{{formateTime(currentSong.duration)}}</div>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i :class="playModeIcon" @click="changeMode"></i>
          </div>
          <div class="icon i-left" @click="prev()">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center" @click="toggleSong()">
            <i class="needsclick" :class="playingIcon"></i>
          </div>
          <div class="icon i-right" @click="next()">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="showFullScreen">
      <div class="icon">
        <div class="image-wrapper" :class="playRotate">
          <img width="40" height="40" :src="currentSong.image" />
        </div>
      </div>
      <div class="text">
        <h2 clashhhhs="name" v-html="currentSong.name"></h2>
        <h3 class="singer" v-html="currentSong.singer"></h3>
      </div>
      <div class="control" @click.stop="toggleSong()">
        <progress-circle :percent="percent">
          <i class="icon-mini" :class="playingIconMini"></i>
        </progress-circle>
      </div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
  </transition>
  <!-- audio有timeupdate事件 -->
  <audio :src="currentSong.url" ref="audio" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
import {
  prefixStyle
} from 'common/js/dom.js'
import animations from 'create-keyframe-animation'
import progressBar from 'base/progress-bar/progress-bar'
import progressCircle from 'base/progress-circle/progress-circle'
import Scroll from 'base/scroll/scroll'
import {
  playMode
} from 'common/js/config'
import {
  shuffle
} from 'common/js/util'
import Lyric from 'lyric-parser'
const transform = prefixStyle('transform')
const transition = prefixStyle('transition')
export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd'
    }
  },
  computed: {
    playingIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    playingIconMini() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    playRotate() {
      return this.playing ? 'play' : 'play pause'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    playModeIcon() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'playList',
      'currentIndex',
      'fullScreen',
      'currentSong',
      'playing',
      'mode',
      'sequenceList'
    ])
  },
  methods: {
    hideFullScreen() {
      this.setFullScreen(false)
    },
    showFullScreen() {
      this.setFullScreen(true)
    },
    enter(el, done) {
      const {
        x,
        y,
        scale
      } = this._getPosAndScale()
      let animation = {
        '0%': {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        '60%': {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        '100%': {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {
        x,
        y,
        scale
      } = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      // transitionend 事件在 CSS 完成过渡后触发。
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    _getPosAndScale() {
      const sWidth = 40
      const lWidth = window.innerWidth
      const paddingLeft = 20
      const bHeight = 50
      const tHeight = 80
      const x = -(window.innerWidth / 2 - paddingLeft - sWidth / 2)
      const y = window.innerHeight - tHeight - sWidth / 2 - bHeight / 2
      const scale = sWidth / lWidth
      return {
        x,
        y,
        scale
      }
    },
    toggleSong() {
      this.setPlayingState(!this.playing)
      this.currentLyric.togglePlay()
    },
    prev() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex
      if (index === 0) {
        index = this.playList.length - 1
      } else {
        index--
      }
      this.setCurrentIndex(index)
      this.songReady = false
    },
    next() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex
      if (index === this.playList.length - 1) {
        index = 0
      } else {
        index++
      }
      this.setCurrentIndex(index)
      this.songReady = false
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    formateTime(time) {
      let min = time / 60 | 0
      let s = time % 60 | 0
      let _s = this._pad(s)
      return min + ':' + _s
    },
    _pad(num, n = 2) {
      // let d = String(num).length
      // if (d >= n) {
      //     return num
      // }
      // for (let i = d; i < n; i++) {
      //     num = '0' + num
      // }
      // return num

      // 下面是老师写的
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    percentChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currentTime
      this.currentLyric.seek(currentTime * 1000)
      if (!this.playing) {
        this.playing = !this.playing
      }
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = false
    },
    changeMode() {
      let mode = this.mode
      mode = (mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (this.mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      const id = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(id)
    },
    end() {
      if (this.playMode === 'loop') {
        this.loop()
      } else {
        this.next()
      }
    },
    loop() {
      const audio = this.$refs.audio
      audio.currentTime = 0
      audio.play()
    },
    getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this.lyricHandle)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    lyricHandle({
      lineNum,
      txt
    }) {
      this.currentLineNum = lineNum
      if (lineNum <= 5) {
        // 如果在顶部,直接滚动到顶部
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      } else {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      }
    },
    middleTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const deltaY = e.touches[0].pageY - this.touch.startY
      // 如果纵轴的偏移大于横轴的偏移,则return
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (this.currentShow === 'cd') {
        let offsetX = Math.max(Math.min(0, deltaX), -this.windowWidth)
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetX}px,0,0)`
        this.touch.movePercent = Math.abs(offsetX / this.windowWidth)
        this.$refs.cdWrapper.style.opacity = 1 - this.touch.movePercent
      } else {
        let offsetX = Math.min(Math.max(0, deltaX), this.windowWidth)
        this.$refs.lyricList.$el.style[transform] = `translate3d(${-this.windowWidth + offsetX}px,0,0)`
        this.touch.movePercent = Math.abs(offsetX / this.windowWidth)
        this.$refs.cdWrapper.style.opacity = this.touch.movePercent
      }
    },
    middleTouchEnd() {
      if (this.currentShow === 'cd') {
        if (this.touch.movePercent > 0.1) {
          this.$refs.lyricList.$el.style[transition] = `all 0.2s ease-in-out`
          this.$refs.lyricList.$el.style[transform] = `translate3d(${-this.windowWidth}px,0,0)`
          this.$refs.cdWrapper.style.opacity = 0
          this.currentShow = 'lyric'
        } else {
          this.$refs.lyricList.$el.style[transform] = `translate3d(0,0,0)`
        }
      } else {
        if (this.touch.movePercent > 0.1) {
          this.$refs.lyricList.$el.style[transition] = `all 0.2s ease-in-out`
          this.$refs.lyricList.$el.style[transform] = `translate3d(0,0,0)`
          this.$refs.cdWrapper.style.opacity = 1
          this.currentShow = 'cd'
        } else {
          this.$refs.lyricList.$el.style[transform] = `translate3d(${-this.windowWidth}px,0,0)`
        }
      }
      this.touch.initiated = false
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE',
      setPlayMode: 'SET_PLAY_MODE',
      setSequenceList: 'SET_SEQUENCE_LIST',
      setPlayList: 'SET_PLAYLIST'
    })
  },
  watch: {
    playing(newPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newPlaying ? audio.play() : audio.pause()
      })
    },
    currentSong(oldSong, newSong) {
      if (oldSong.id === newSong.id) {
        return
      }
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (newSong) {
          audio.play()
          this.getLyric()
        }
      })
    }
  },
  created() {
    this.windowWidth = window.innerWidth
    this.touch = {}
  },
  components: {
    progressBar,
    progressCircle,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"

    .player
        .normal-player
            position:fixed
            top:0
            left:0
            right:0
            bottom:0
            z-index: 150
            background: $color-background
            .background
                position :absolute
                top:0
                left:0
                width:100%
                height:100%
                z-index:-1
                opacity :0.6
                filter:blur(20px)
            .top
                position: relative
                margin-bottom: 25px
                .back
                    position : absolute
                    top:0
                    left:0
                    z-index:50
                    .icon-back
                        display :block
                        padding:9px
                        font-size: $font-size-large-x
                        color: $color-theme
                        transform:rotate(-90deg)
                .title
                    width: 70%
                    margin: 0 auto
                    line-height: 40px
                    no-wrap()
                    text-align: center
                    font-size: $font-size-large
                    color: $color-text
                .subtitle
                    line-height: 20px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-text
            .middle
                position: fixed
                width: 100%
                top: 80px
                bottom: 170px
                white-space: nowrap
                font-size: 0
                .middle-l
                    display: inline-block
                    // 两个行内块元素垂直居中
                    vertical-align :top
                    height: 0
                    width: 100%
                    // 注意这里的padding-top百分比是基于父元素宽度的,
                    // 这样才能计算出一个正方形的子元素
                    padding-top: 80%
                    position : relative
                    .cd-wrapper
                        position: absolute
                        top:0
                        left: 10%
                        width: 80%
                        height: 100%
                        .cd
                            width: 100%
                            height: 100%
                            border: 10px solid rgba(255, 255, 255, 0.1)
                            border-radius: 50%
                            box-sizing :border-box
                            overflow :hidden
                            &.play
                                animation:rotate 20s linear infinite
                            &.pause
                                animation-play-state:paused
                            .cd-image
                                margin:-10px 0 0 -10px
                .middle-r
                  display: inline-block
                  vertical-align: top
                  width: 100%
                  height: 100%
                  overflow: hidden
                  .lyric-wrapper
                    width: 80%
                    margin: 0 auto
                    overflow: hidden
                    text-align: center
                    .text
                      line-height: 32px
                      color: $color-text-l
                      font-size: $font-size-medium
                      &.current
                        color: $color-text
                    .pure-music
                      padding-top: 50%
                      line-height: 32px
                      color: $color-text-l
                      font-size: $font-size-medium
            .bottom
                position : absolute
                bottom : 50px
                width: 100%
                .dot-wrapper
                    text-align :center
                    font-size :0
                    .dot
                        display :inline-block
                        vertical-align :middle
                        margin: 0 4px
                        width: 8px
                        height: 8px
                        border-radius :50%
                        background: $color-text-l
                        &.active
                            width: 20px
                            border-radius :5px
                            background: $color-text-ll
                .progress-wrapper
                    display: flex
                    width :80%
                    margin: 0 auto
                    padding:10px 0
                    .time
                        color: $color-text
                        font-size: $font-size-small
                        flex:0 0 30px
                        line-height :30px
                        &.time-l
                            text-align: left
                        &.time-r
                            text-align: right
                .operators
                    width: 80%
                    margin: 0 auto
                    display :flex
                    align-items: center
                    .icon
                        flex: 1
                        color: $color-theme
                        text-align : center
                        i
                            font-size :30px
                        & .icon-pause
                            font-size :46px
                        & .icon-play
                            font-size :46px
                        &.i-left
                            text-align :left
                        &.i-right
                            text-align :right
            // 定义动画
            // 1. 为哪块区域定义动画,就用transition标签将那块区域包起来,并设置name属性
            // 2. 编写css名,注意用&链接
            // 3.上面一个写一个transition变化的时间就好了,可能内嵌的其他标签变化方式不一样
            // 4.下面的定义变化的属性,注意与不同标签配合使用,没有则作用于整个的父标签
            &.normal-enter-active, &.normal-leave-active
                transition: all 0.3s
                .top, .bottom
                    transition : all 0.3s cubic-bezier(0.86, 0.18, 0.82, 1.32)
            &.normal-enter, &.normal-leave-to
                opacity :0
                .top
                    transform: translate3d(0, -100px, 0)
                .bottom
                    transform: translate3d(0, 100px, 0)
        .mini-player
            position :fixed
            background :$color-highlight-background
            left:0
            width: 100%
            bottom: 0
            height: 50px
            z-index: 150
            display :flex
            align-items: center
            .icon
                flex:0 0 40px
                padding:0 10px 0 20px
                .image-wrapper
                 border-radius :50%
                 overflow :hidden
                 &.play
                     animation:rotate 20s linear infinite
                 &.pause
                     animation-play-state:paused
            .text
                flex: 1
                display :flex
                flex-direction: column
                justify-content: center
                overflow :hidden
                .name
                    no-wrap()
                    font-size: $font-size-medium
                    color: $color-text
                    margin-bottom: 2px
                .singer
                    no-wrap()
                    font-size: $font-size-small
                    color: $color-text-d
            .control
                flex:0 0 30px
                width: 30px
                padding: 0 10px
                .progress-circle
                    position :relative
                    .icon-mini
                        position:absolute
                        font-size :32px
                        color: $color-theme-d
                        left: 0
                        top: 0
                .icon-playlist
                    font-size: 30px
                    color: $color-theme-d
            &.mini-enter-active, &.mini-leave-active
                transition: all 0.4s
            &.mini-enter, &.mini-leave-to
                opacity : 0
@keyframes rotate {
    0% {
        transform: rotate(0deg)
    }
    100% {
        transform: rotate(360deg)
    }
}

</style>
