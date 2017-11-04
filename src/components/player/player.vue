<template>
    <div class="player"  v-show="playList.length>0">
        <div class="normal-player" v-show="fullScreen">播放器</div>
        <div class="mini-player" v-show="!fullScreen"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'playList',
            'fullScreen'
        ])
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
        background :pink

</style>