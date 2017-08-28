<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
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
            this.children = this.$refs.sliderGroup.children
            let width = 0
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
            }
        },
        _initSlider() {

        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slider

</style>
