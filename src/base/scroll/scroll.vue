<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll: {
            type: Boolean,
            default: false
        }
    },
    // 为了保证DOM已经渲染完成
    mounted() {
        setTimeout(() => {
            if (!this.$refs.wrapper) {
                return
            }
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
            if (this.listenScroll) {
                let me = this
                this.scroll.on('scroll', (pos) => {
                    console.log(pos)
                    me.$emit('scroll', pos)
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            })
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
