<template>
    <Scroll @scroll="scroll" :data="data" class="list-view" ref="listvue" :listen-scroll="listenScroll" :probeType="probeType">
        <ul class="list-group">
            <li v-for="listGroup in data" ref="listGroup">
                <h2 class="group-title">{{listGroup.title}}</h2>
                <ul>
                    <li v-for="item in listGroup.item" class="list-item" @click="selectItem(item)">
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
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}}</div>
        </div>
        <div v-show="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </Scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom.js'
import Loading from 'base/loading/loading'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
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
        this.listHeight = []
        this.probeType = 3
    },
    data() {
        return {
            currentIndex: 0,
            scrollY: -1,
            diff: -1
        }
    },
    computed: {
        shortcutList() {
            return this.data.map((item, index) => {
                return item.title.substr(0, 1)
            })
        },
        fixedTitle() {
            if (this.scrollY > 0) {
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
    // 为了保证DOM已经渲染完成
    mounted() {

    },
    methods: {
        onShortcutTouchStart(e) {
            let anchorIndex = getData(e.target, 'index')
            this.currentIndex = parseInt(anchorIndex)
            // e.touches获得触碰的手指,[0]触碰的第一个手指的位置
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {
            // let anchorIndex2 = getData(e.target, 'index')
            // console.log('anchorIndex2', anchorIndex2)
            // 以上不可, e.target只能取到鼠标touchstart选中的节点
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            // | 向下取整,跟Math.floor一样
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
            let goToAnchorIndex = parseInt(this.touch.anchorIndex) + parseInt(delta)
            this._scrollTo(goToAnchorIndex)
        },
        selectItem(item) {
            this.$emit('select', item)
        },
        scroll(pos) {
            this.scrollY = pos.y    
        },
        _scrollTo(index) {
            // 避免点到A跟#边缘的地方,index为null,后面会报错
            if (!index && index !== 0) {
                return
            }
            this.currentIndex = index
            // 第二个参数的意义是滚动的动画时长
            this.$refs.listvue.scrollToElement(this.$refs.listGroup[index], 0)
        },
        _caculateHeight() {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        }
    },
    watch: {
        // 监听data的变化,延时计算dom的高度,因为获取数据到dom渲染有一点的延迟,
        // 一般用$nextTick,为了确保所有手机兼容性,用setTimeout()
        data() {
            setTimeout(() => {
                this._caculateHeight()
            }, 20)
        },
        // 观测scrollY的变化
        scrollY(newY) {
            const listHeight = this.listHeight
            // newY>0
            if (newY >= 0) {
                this.currentIndex = 0
                return
            }
            // 在中间部分滚动
            for (let i = 0; i < listHeight.length; i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                if (!height2 || -newY >= height1 && -newY < height2) {
                    this.currentIndex = i
                    this.diff = height2 + newY
                    return
                }
            }
        },
        diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
            // 下面四行减少DOM操作的频度
            if (this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    },
    components: {
        Scroll,
        Loading
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
                padding-left: 20px
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
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background  
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
