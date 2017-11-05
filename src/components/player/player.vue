<template>
    <div class="player" v-show="playList.length>0">
        <div class="normal-player" v-show="fullScreen">
            <div class="background">
                <img width="100%" height="100%" :src="currentSong.image" />
            </div>
            <div class="top">
                <div class="back">
                    <i class="icon-back"></i>
                </div>
                <h2 class="title" v-html="currentSong.name"></h2>
                <h3 class="subtitle" v-html="currentSong.singer"></h3>
            </div>
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper">
                        <div class="cd"></div>
                    </div>
                    <div class="playing-lyric-wrapper">
                        <div class="playing-lyric"></div>
                    </div>
                </div>
                <div class="middle-r"></div>
            </div>
            <div class="bottom">
                <div class="dot-wrapper">
                    <b class="dot"></b>
                    <b class="dot"></b>
                </div>
                <div class="progress-wrapper">
                    <span class="time time-l"></span>
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
                    <div class="time time-r"></div>
                </div>
                <div class="operators">
                    <div class="icon i-left">
                        <i class="icon-sequence"></i>
                    </div>
                    <div class="icon i-left">
                        <i class="icon-sequence"></i>
                    </div>
                    <div class="icon i-center">
                        <i class="needsclick icon-pause"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon-sequence"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon icon-not-favorite"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="mini-player" v-show="!fullScreen">
    
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        bgStyle() {
            return `background: url(${this.currentSong.image}) no-repeat center top  100% 100%`
        },
        ...mapGetters([
            'playList',
            'currentIndex',
            'fullScreen',
            'currentSong'
        ])
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

</style>