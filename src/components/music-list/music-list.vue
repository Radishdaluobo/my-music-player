<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" ref="bgImage" :style="bgStyle">
            <div class="filter" ref="filter"></div>
            <div class="play-wrapper" @click="random">
                <div ref="playBtn" v-show="songs.length>0" class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll @scroll="scroll" class="list" :style="paddingTop" ref="list" :probe-type="probeType" :data="songs" :listen-scroll="listenScroll">
            <div class="song-list-wrapper">
                <song-list :songs="songs" @select="selectItem"></song-list>
                <div v-show="!songs.length" class="loading-container">
                    <loading></loading>
                </div>
                <div :style="changeBSHeight"></div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import songList from 'base/song-list/song-list'
import { prefixStyle } from 'common/js/dom.js'
import Loading from 'base/loading/loading'
import { mapActions } from 'vuex'

const transform = prefixStyle('transform')
const RESERVED_HEIGHT = 40
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        bgImage: {
            type: String,
            default: ''
        },
        songs: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            scrollY: 0,
            imageHeight: 0
        }
    },
    computed: {
        bgStyle() {
            return `background-image: url(${this.bgImage})`
        },
        paddingTop() {
            return `padding-top:${this.imageHeight - RESERVED_HEIGHT}px`
        },
        // 我也不知道为什么加padding-bottom和margin-bottom就是不行
        changeBSHeight() {
            return `height:${this.imageHeight - RESERVED_HEIGHT}px`
        }
    },
    created() {
        this.listenScroll = true
        this.probeType = 3
    },
    mounted() {
        // this.$refs.list拿到的是一个vue component实例,所以要继续.$el拿到DOM对象
        // this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
        this._initScrollTop()

    },
    methods: {
        _initScrollTop() {
            this.imageHeight = this.$refs.bgImage.clientHeight
        },
        back() {
            this.$router.back()
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        selectItem(item, index) {
            this.selectPlay({
                list: this.songs,
                index
            })
        },
        random() {
          this.randomPlay({
            list: this.songs
          })
        },
        ...mapActions([
            'selectPlay',
            'randomPlay'
        ])
    },
    watch: {
        scrollY(newY) {
            if (newY < 0 && -newY < this.imageHeight - RESERVED_HEIGHT) {
                this.$refs.layer.style[transform] = `translate3d(0,${newY}px,0)`
            } else if (newY > 0) {
                this.$refs.layer.style[transform] = `translate3d(0,${newY}px,0)`
                let percent = 1 + newY / this.imageHeight
                this.$refs.bgImage.style['transform'] = `scale3d(${percent},${percent},1)`
            }

        }
    },
    components: {
        Scroll,
        songList,
        Loading
    }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"
    .music-list
        position :fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index : 100
        background : $color-background
        .back
            position :absolute
            top: 0
            left: 6px
            z-index: 50 // i
            .icon-back
                padding: 10px
                display: inline-block
                font-size: $font-size-large-x
                color: $color-theme
        // 必须也要用绝对定位
        .title
            position :absolute
            top: 0
            left: 10%
            width:80%
            z-index: 40
            // 字数超出的部分用省略号代替
            no-wrap()
            text-align :center
            line-height :40px
            font-size :$font-size-large
            color: $color-text
        .bg-image
            position: relative
            width :100%
            height :0
            padding-top: 70%
            // 注意这两条background属性
            background-size: cover
            background-origin :top
            // background-position :center
            .play-wrapper
                font-size: $font-size-small
                color: $color-theme
                position: absolute
                bottom: 40px
                left: 50%
                transform : translateX(-50%)
                z-index: 60
                .play
                    border:1px solid $color-theme
                    padding:5px
                    border-radius :15px
                    .icon-play
                        display :inline-block
                        vertical-align :middle
                    .text
                        display:inlune-block
                        vertical-align :middle
            .filter
                position: absolute
                top: 0
                left: 0
                height: 100%
                width: 100%
                background :rgba(7, 17, 27, 0.4)
        .bg-layer
            height: 100%
            background: $color-background
            z-index:50
        .list
            position: fixed
            top: 40px
            bottom: 0
            width: 100%
            overflow :hidden
            .song-list-wrapper
                padding:20px 30px
                .loading-container
                    position: absolute
                    width: 100%
                    top: 50%
                    transform: translateY(-50%)
</style>
