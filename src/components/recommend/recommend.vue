<template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="" slider-wrapper>
                <slider>
                    <ul>
                        <li v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" />
                            </a>
                        </li>
                    </ul>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import getRecommend from 'common/api/recommend'
import { ERR_OK } from 'common/api/config'
import Slider from 'base/slider/slider'

export default {
    data() {
        return {
            recommends: []
        }
    },
    created() {
        this._getRecommend()
    },
    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider
                }
            })
        }
    },
    components: {
        Slider
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



</style>