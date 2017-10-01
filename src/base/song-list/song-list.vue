<template>
    <div class="song-list">
        <ul>
            <li v-for="song in songs" class="item">
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
        }
    },
    watch: {

    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .song-list
        // padding:20px 30px
        .title
            font-size: $font-size-mediium   
        .desc
            font-size: $font-size-small
</style>
