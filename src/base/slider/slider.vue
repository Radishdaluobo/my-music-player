<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span v-for="(item,index) in dots.length" :class="{'active' : currentPageIndex === index}" class="dot"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '../../common/js/dom.js'
export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    // 为了保证DOM已经渲染完成
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initDots()
            this._initSlider()
            if (this.autoPlay) {
                clearTimeout(this.timer)
                this._play()
            }
            // 一般浏览器刷新是17ms一次，20ms是经验值
        }, 20)
        window.addEventListener('resize', () => {
            this._setSliderWidth(true)
        })

    },
    methods: {
        _setSliderWidth(isResize) {
            this.children = this.$refs.sliderGroup.children
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            if (this.loop && !isResize) {
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400
            })
            this.slider.on('scrollEnd', () => {
                let currentPage = this.slider.getCurrentPage().pageX
                this.currentPageIndex = currentPage
            })
        },
        _play() {
            this.timer = setInterval(() => {
                this.currentPageIndex++
                this.currentPageIndex = this.currentPageIndex === 5 ? 0 : this.currentPageIndex
                this.slider.goToPage(this.currentPageIndex, 0, 300, 'easing')
            }, this.interval)
        }
    },
    destroyed() {
        // 组件销毁的时候把定时器清空
        clearTimeout(this.timer)
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.slider
    width: 100%
    overflow :hidden
    position: relative
    .slider-group
        .slider-item
            float: left
            a 
                display: inline-block
                width:100%
                img
                    width:100%
    .dots
        position: absolute
        bottom: 10px
        left: 0
        right: 0
        text-align :center
        .dot
            display :inline-block
            background :rgba(255,255,255,0.6)
            width: 6px
            height: 6px
            border-radius :50%
            margin-right:5px
        & .active
            width: 10px
            border-radius :3px
</style>
