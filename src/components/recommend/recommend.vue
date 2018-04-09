<template>
<div class='recommend' ref='recommend'>
  <Scroll class='recommend-content' ref='scroll' :data='discList'>
    <!--这里要保证recommends有内容才渲染,recommends取值是异步的-->
    <div>
      <div v-if='recommends.length' class='slider-wrapper'>
        <slider>
          <div v-for='item in recommends' class='slider-item'>
            <a :href='item.linkUrl'>
                <img class='needsclick' @load='loadImage()' :src='item.picUrl' />
            </a>
          </div>
        </slider>
      </div>
      <div class='recommend-list'>
        <h1 class='list-title'>热门歌单推荐</h1>
        <ul>
          <li @click='selectDisc(item)' class='item' v-for='item in discList'>
            <div class='icon'>
              <img width='60' height='60' v-lazy='item.imgurl' />
            </div>
            <div class='text'>
              <h3 class='name' v-html='item.creator.name'></h3>
              <p class='desc' v-html='item.dissname'></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class='loading-container' v-show='!discList.length'>
      <Loading></Loading>
    </div>
  </Scroll>
  <router-view></router-view>
</div>
</template>

<script>
import { getRecommend, getDiscList } from '../../api/recommend'
import { ERR_OK } from 'common/js/config'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import { playlistMixin } from 'common/js/mixin'
import { mapGetters, mapMutations } from 'vuex'

export default {
  mixins: [playlistMixin],
  computed: {
    ...mapGetters(['playList'])
  },
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      if (!this.imageLoadCheck) {
        this.$refs.scroll.refresh()
        this.imageLoadCheck = true
      }
    },
    selectDisc(item) {
      console.log(item)
      this.$router.push({
          path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    handlePlayList() {
      const bottom = this.playList ? 50 : 0
      this.$refs.recommend.style.bottom = bottom + 'px'
    },
    ...mapMutations({
    // 做对象的映射,把mutation的修改映射成一个方法对象名
    setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/variable.styl'

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        // 下面一条,定义子元素项目在交叉上如何对齐
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
