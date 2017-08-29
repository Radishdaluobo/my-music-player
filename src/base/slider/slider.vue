<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dot">
            <span v-for="(item,index) in dots.length" :class="{'active' : currentPageIndex === index}" class="dot-item"></span>
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
        }, 20)
        // 一般浏览器刷新是17ms一次，20ms是经验值
    },
    methods: {
        _setSliderWidth() {
            this.children = this.$refs.sliderGroup.children
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            this.loop ? width += 2 * sliderWidth : width
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                click: true,
                momentum: false,
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400
            })
            this.slider.on('scrollEnd', () => {
                let currentPage = this.slider.getCurrentPage().pageX
                // console.log('currentPage', currentPage)
                this.currentPageIndex = currentPage
            })
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.slider
    width: 100%
    overflow :hidden
    .slider-group
        .slider-item
            float: left
            a 
                display: inline-block
                width:100%
                img
                    width:100%
    .dot
        .dot-item
            display :inline-block
            background :#fff
            width: 6px
            height: 6px
            border-radius :50%
</style>
