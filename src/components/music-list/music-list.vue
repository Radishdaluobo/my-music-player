<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title">{{title}}</h1>
        <div class="bg-image">
            <img :src="bgImage" class="image" />
            <div class="filter"></div>
        </div>
        <div class="songList">
            <scroll>
                <ul>
                    <li v-for="song in songs">
                        <h2>{{song.name}}</h2>
                    </li>
                </ul>
            </scroll>
        </div>
    
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
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

        }
    },
    created() {
    },
    methods: {
        back() {
            this.$router.back()
        }
    },
    components: {
        Scroll
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
        .songList
            width: 100%
            height: 50%
            background :$color-background
            z-index :50
</style>