<template>
    <div class="recommend">
        <Scroll class="recommend-content" :data="discList">
            <!--这里要保证recommends有内容才渲染,recommends取值是异步的-->
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in recommends" class="slider-item">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" />
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul class="dis-container">
                        <li class="list-item" v-for="item in discList">
                            <div class="list-image">
                                <img width="60" height="60" :src="item.imgurl" />
                            </div>
                            <div class="list-content">
                                <h3 class="name" v-html="item.creator.name"></h3>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Scroll>
    </div>
</template>

<script>
import { getRecommend, getDiscList } from 'common/api/recommend'
import { ERR_OK } from 'common/api/config'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'

export default {
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
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider
                }
            })
        },
        _getDiscList() {
            getDiscList().then((res) => {
                if (res.code === ERR_OK) {
                    this.discList = res.data.list
                }
            })
        }
    },
    components: {
        Slider,
        Scroll
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"
.recommend
    .recommend-content
    .recommend-list
        .list-title
            height:65px
            line-height:65px
            text-align :center
            font-size :14px
            color :$color-theme
        .dis-container
            padding:10px 15px
            .list-item
                display:flex
                box-sizing: border-box
                // 下面一条,定义子元素项目在交叉上如何对齐
                align-items: center
                .list-image
                    flex:0 0 60px
                    img
                        width: 100%
                .list-content
                    padding-left:15px 
                    flex:1
                    // 垂直居中,下面三天,炒鸡简单
                    display:flex
                    flex-direction: column
                    justify-content: center
                    font-size: $font-size-medium
                    line-height: 20px
                    overflow: hidden
                    .name
                        margin-bottom: 10px
                        color: $color-text
                    .desc
                        color: $color-text-d

</style>