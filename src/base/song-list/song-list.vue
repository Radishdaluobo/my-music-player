<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(song,index)" v-for="(song,index) in songs" class="item">
                <h2 class="name">{{song.name}}</h2>
                <p class="desc">{{getDesc(song)}}</p>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        songs: {
            type: Array,
            default: []
        }
    },
    // 为了保证DOM已经渲染完成
    mounted() {

    },
    methods: {
        getDesc(song) {
            return `${song.singer} · ${song.album} `
        },
        selectItem(item, index) {
            this.$emit('select', item, index)
        }
    },
    watch: {

    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
@import "../../common/stylus/mixin.styl"
    .song-list
        .item
            display:flex
            display: flex;
            flex-direction: column
            justify-content: center
            height:64px
            .name
                font-size: $font-size-mediium 
                color: $color-text  
                no-wrap()
            .desc
                font-size: $font-size-small
                margin-top: 4px
                color: $color-text-d
                no-wrap()
</style>
