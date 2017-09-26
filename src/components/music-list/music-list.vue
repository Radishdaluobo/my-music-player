<template>
    <div class="music-list">
        <div class="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title">{{title}}</h1>
        <div class="bg-image">
            <div class="filter"></div>
        </div>
    </div>
</template>

<script>
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
        songList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {

        }
    }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"

</style>