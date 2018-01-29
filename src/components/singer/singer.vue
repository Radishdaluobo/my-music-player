<template>
    <div class="singer" href="singer">
        <!--注意这里是select-->
        <listvue :data="singers" @select="selectSinger"></listvue>
        <router-view></router-view>
    </div>
</template>

<script>
import { getSingerList } from '../../api/singer'
import { ERR_OK } from 'common/js/config'
import Singer from 'common/js/singer'
import listvue from '../../base/listview/listvue'
import {
  playlistMixin
} from 'common/js/mixin'
// vuex的语法糖
import { mapGetters, mapMutations } from 'vuex'

const HOT_NAME = '热门歌手'
const HOT_SINGER_LEN = 10
export default {
  mixins: [playlistMixin],
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
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
        },
        selectSinger(singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            })
            // 映射之后调用setSinger,将singer数据传入,实现了对一个mutation的提交
            this.setSinger(singer)
        },
        handlePlayList() {
          const bottom = this.playList ? 50 : 0
          this.$refs.singer.style.bottom = bottom + 'px'
        },
        // 拓展对象符的方式,调mapMutations
        ...mapMutations({
            // 做对象的映射,把mutation的修改映射成一个方法对象名
            setSinger: 'SET_SINGER'
        })
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
