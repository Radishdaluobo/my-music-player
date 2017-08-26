<template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="" slider-wrapper>
    
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
import getRecommend from '../../common/api/recommend'
import { ERR_OK } from '../../common/api/config'

export default {
    created() {
        this._getRecommend()
    },
    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                console.log(res.code, ERR_OK)
                if (res.code === ERR_OK) {
                    console.log('data', res.data.slider)
                }
            })
        }
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