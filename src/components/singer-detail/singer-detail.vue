<template>
    <transition name="slide">
        <div class="singer-detail">
            singer-detail
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from 'common/js/config'
import { createSong } from 'common/js/song'

export default {
    data() {
        return {

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
                    this._normalizeSongs(res.data.list)
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
            console.log(res)
        }
    },
    components: {
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