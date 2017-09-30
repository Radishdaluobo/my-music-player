<template>
    <div class="song-list">
        <ul>
            <li v-for="song in songs">
                <h2 class="title">{{song.name}}</h2>
                <p class="desc">{{song.singer + '·' +song.album}}</p>
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
        console.log('this.songs3', this.songs)
    },
    methods: {

    },
    watch: {

    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .song-list
        padding:20px 30px
        .title
            font-size: $font-size-mediium   
        .desc
            font-size: $font-size-small
</style>
