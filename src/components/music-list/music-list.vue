<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title">{{title}}</h1>
        <div class="bg-image" ref="bgImage">
            <img :src="bgImage" class="image" />
        </div>
        <div class="filter" ref="filter" :style="filterHeight"></div>
        <scroll @scroll="scroll" class="songList" :probeType="probeType" :data="songs" :listen-scroll="listenScroll" :style="fixedTop">
            <song-list :songs="songs"></song-list>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import songList from 'base/song-list/song-list'
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
            y: 0,
            scrollY: 0
        }
    },
    computed: {
        fixedTop() {
            return `padding-top:${this.y - 35}px`
        },
        filterHeight() {
            const screenHeight = document.documentElement.clientHeight
            return `height:${screenHeight - 35}px`
        }
    },
    created() {
        this.listenScroll = true
        this.probeType = 3
    },
    mounted() {
        setTimeout(() => {
            this._initScrollTop()
        }, 20)
    },
    methods: {
        _initScrollTop() {
            this.y = this.$refs.bgImage.clientHeight
        },
        back() {
            this.$router.back()
        },
        scroll(pos) {
            this.scrollY = pos.y
        }
    },
    watch: {
        scrollY(newy) {
            if (-newy > this.y - 35) {
                return
            }
            this.$refs.filter.style.transform = `translate3d(0,${newy}px,0)`
        }
    },
    components: {
        Scroll,
        songList
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
            // 字数超出的部分用省略号代替
            text-overflow :ellipsis
            overflow :hidden
            white-space :normal
            text-align :center
            line-height :40px
            font-size :$font-size-large
            color: $color-text
        .bg-image
            width :100%
            height :40%
            z-index :30
            overflow :hidden
            .image
                width: 100%
        .filter
            width: 100%
            background :$color-background
        .songList
            z-index :50
            position :fixed
            top: 40px
            bottom: 0
            left: 0
            right: 0
            overflow :hidden
</style>