<template>
    <transition name="slide">
        <div class="singer-detail">
            <music-list :title="title" :bgImage="bgImage" :songList="songList"></music-list>
        </div>
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
            title: '',
            bgImage: '',
            songList: []
        }
    },
    computed: {
        ...mapGetters([
            'singer'
        ])
    },
    created() {
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
                    this.title = res.data.singer_name
                    this.bgImage = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`
                    this.songList = this._normalizeSongs(res.data.list)
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
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.slide-enter-active, .slide-leave-active 
    transition: all 0.3s
.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
.singer-detail
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index :100
    background :$color-background
</style>