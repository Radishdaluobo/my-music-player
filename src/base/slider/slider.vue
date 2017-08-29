<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
// import BScroll from 'better-scroll'
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

        }
    },
    // 为了保证DOM已经渲染完成
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initSlider()
        }, 20)
        // 一般浏览器刷新是17ms一次，20ms是经验值
    },
    methods: {
        _setSliderWidth() {
            console.log('setSliderWidth')
            this.children = this.$refs.sliderGroup.children
            console.log('this.children', this.children)
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            console.log(sliderWidth)
            console.log(this.children.length)
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            this.loop ? width += 2 * sliderWidth : width
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {

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
</style>
