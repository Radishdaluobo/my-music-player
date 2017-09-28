<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script>
import musicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from 'common/js/config'
import { createSong } from 'common/js/song'

export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage() {
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    created() {
        console.log('singerDetail页面')
        this._getSingerDetail()
    },
    methods: {
        _getSingerDetail() {
            // 处理边界情况
            if (!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then((res) => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                }
            })
        },
        _normalizeSongs(songList) {
            let res = []
            songList.forEach((item) => {
                // 解构!!!
                let { musicData } = item
                // 这里必须要用一个返回值接收一下
                let songList = createSong(musicData)
                res.push(songList)
            })
            return res
        }
    },
    components: {
        musicList
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': '_getSingerDetail'
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.slide-enter-active, .slide-leave-active 
    transition: all 0.3s
.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>