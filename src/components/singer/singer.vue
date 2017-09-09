<template>
    <div class="singer">
        singer
    </div>
</template>

<script>
import { getSingerList } from '../../api/singer'
import { ERR_OK } from 'common/js/config'
import Singer from 'common/js/singer'
const HOT_NAME = '热门歌手'
const HOT_SINGER_LEN = 10
export default {
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        _getSingerList() {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    console.log(res.data.list)
                    this._normalizeSinger(res.data.list)
                }
            })
        },
        _normalizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    item: []
                }
            }
            // let singer = {}
            list.forEach((item, index) => {
                if (map.hot.item.length < HOT_SINGER_LEN) {
                    map.hot.item.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
                }
            })
             console.log(map.hot)

        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.singer
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
</style>