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
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd">
                                <img class="cd-image" :src="currentSong.image" />
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric"></div>
                        </div>
                    </div>
                    <div class="middle-r">
                        <div class="lyric-wrapper">
                            <div class="text"></div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <b class="dot active"></b>
                        <b class="dot"></b>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">1:00</span>
                        <div class="progress-bar-wrapper">
                            <div class="progress-bar">
                                <div class="bar-inner">
                                    <div class="progress"></div>
                                    <div class="process-btn-wrapper">
                                        <div class="progress-btn"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="time time-r">4:20</div>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left" @click="prev()">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" @click="toggleSong()">
                            <i class="needsclick icon-pause"></i>
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
                    <div class="image-wrapper">
                        <img width="40" height="40" :src="currentSong.image" />
                    </div>
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <h3 class="singer" v-html="currentSong.singer"></h3>
                </div>
                <div class="control">
                    <div class="progress-circle">
                        <i class="icon-mini icon-pause-mini"></i>
                    </div>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio :src="currentSong.url" ref="audio"></audio>
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
    
    const transform = prefixStyle('transform')
    export default {
        computed: {
            ...mapGetters([
                'playList',
                'currentIndex',
                'fullScreen',
                'currentSong',
                'playing'
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
                    scale: scale
                }
            },
            toggleSong() {
                this.setPlayingState(!this.playing)
            },
            prev() {
                let index = this.currentIndex
                if (index === 0) {
                    index = this.playList.length - 1
                } else {
                    index--
                }
                this.setCurrentIndex(index)
            },
            next() {
                let index = this.currentIndex
                if (index === this.playList.length - 1) {
                    index = 0
                } else {
                    index++
                }
                this.setCurrentIndex(index)
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayingState: 'SET_PLAYING_STATE'
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
                this.$nextTick(() => {
                    const audio = this.$refs.audio
                    if (newSong) {
                        audio.play()
                    }
                })
            }
        },
        created() {
    
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
                            .cd-image
                                margin:-10px 0 0 -10px
                .middle-r
                    display :inline-block
                    vertical-align :top
                    width: 100%
                    height: 100%
                    overflow :hidden
                    .lyric-wrapper
                        width: 80%
                        margin: 0 auto
                        text-align :center
                        overflow :hidden
                        .text
                            line-height :32px
                            color: $color-text-l
                            font-size: $font-size-medium
                            &.current
                                color: $color-text
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
                                    width: 35%
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
                padding: 0 10px
                .progress-circle
                    position :relative
                    .icon-mini
                        font-size :32px 
                        color: $color-theme-d
                .icon-playlist
                    font-size: 30px
                    color: $color-theme-d
            &.mini-enter-active, &.mini-leave-active
                transition: all 0.4s
            &.mini-enter, &.mini-leave-to
                opacity : 0

</style>