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
                <div class="title">
                    <h2 class="title" v-html="currentSong.name"></h2>
                    <h3 class="subtitle" v-html="currentSong.singer"></h3>
                </div>
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
        position:fixed
        top:0
        left:0
        right:0
        bottom:0
        .normal-player
            width:100%
            height:100%

</style>