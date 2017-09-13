<template>
    <Scroll @scroll="scroll" :data="data" class="list-view" ref="listvue" :listenScroll="listenScroll">
        <ul class="list-group">
            <li v-for="listGroup in data" ref="listGroup">
                <h2 class="group-title">{{listGroup.title}}</h2>
                <ul>
                    <li v-for="item in listGroup.item" class="list-item">
                        <img width="50" height="50" class="avatar" v-lazy="item.avatar" />
                        <span class="singer-name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart.top.prevent="onShortcutTouchStart" @touchmove.top.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item,index) in shortcutList" class="item" :data-index="index" :class="{'current':currentIndex === index}">{{item}}</li>
            </ul>
        </div>
    </Scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom.js'
const ANCHOR_HEIGHT = 18
export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    created() {
        // 这里声明这个空对象是因为下面两个函数之间需要公用一些变量
        this.touch = {}
        this.listenScroll = true
    },
    data() {
        return {
            currentIndex: 0
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
    methods: {
        onShortcutTouchStart(e) {
            let anchorIndex = getData(e.target, 'index')
            this.currentIndex = anchorIndex
            console.log(this.currentIndex)
            // e.touches获得触碰的手指,[0]触碰的第一个手指的位置
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            // | 向下取整,跟Math.floor一样
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
            let goToAnchorIndex = parseInt(this.touch.anchorIndex) + parseInt(delta)
            this._scrollTo(goToAnchorIndex)
        },
        scroll(pos) {
            console.log(111111)
            console.log(pos.y)
        },
        _scrollTo(index) {
            // 第二个参数的意义是滚动的动画时长
            this.$refs.listvue.scrollToElement(this.$refs.listGroup[index], 0)
        }
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
        position :relative
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
        .list-shortcut
            position :absolute
            right: 10px
            top:50%
            transform :translateY(-50%)
            font-size :$font-size-small
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            z-index : 30
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                &.current
                    color: $color-theme
</style>
