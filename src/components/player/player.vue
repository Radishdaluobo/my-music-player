<template>
    <div class="player">
        <div class="normal-player">播放器</div>
        <div class="mini-player"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'playList'
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