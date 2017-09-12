<template>
    <Scroll :data="data" class="list-view">
        <ul class="list-group">
            <li v-for="listGroup in data">
                <h2 class="group-title">{{listGroup.title}}</h2>
                <ul>
                    <li v-for="item in listGroup.item" class="list-item">
                        <img width="50" height="50" class="avatar" v-lazy="item.avatar" />
                        <span class="singer-name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li v-for="(item,index) in shortcutList">{{item}}</li>
            </ul>
        </div>
    </Scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    computed: {
        shortcutList() {
            return this.data.map((item, index) => {
                return item.title.substr(0, 1)
            })
        }
    },
    // 为了保证DOM已经渲染完成
    mounted() {

    },
    components: {
        Scroll
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
    .list-view
        width: 100% //i
        height: 100%
        overflow :hidden //i
        background :$color-background
        .list-group
            padding-bottom: 30px
            .group-title
                height: 30px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
                line-height: 30px
                padding-left: 10px
            .list-item
                // 一行在div中的垂直居中
                display: flex
                aligin-items: center
                padding: 20px 0 5px 30px
                .avatar
                    width: 50px //i
                    height: 50px //i
                    border-radius :50%
                .singer-name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
</style>
