<template>
    <div class="singer">
        <listvue :data="singers"></listvue>
    </div>
</template>

<script>
import { getSingerList } from '../../api/singer'
import { ERR_OK } from 'common/js/config'
import Singer from 'common/js/singer'
import listvue from '../../base/listview/listvue'

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
                    this.singers = this._normalizeSinger(res.data.list)
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
            list.forEach((item, index) => {
                if (index < HOT_SINGER_LEN) {
                    map.hot.item.push(
                        new Singer(item.Fsinger_mid, item.Fsinger_name)
                    )
                }
                let key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        item: []
                    }
                }
                if (item.Findex === key) {
                    map[key].item.push(
                        new Singer(item.Fsinger_mid, item.Fsinger_name)
                    )
                }
            })

            // 为了得到有序列表,需要处理一下map
            let ret = []
            let hot = []
            let other = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                } else {
                    other.push(val)
                    other[0].title = '#'
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            let singer = hot.concat(ret).concat(other)
            return singer
        }
    },
    components: {
        listvue
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