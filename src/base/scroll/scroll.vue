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
        }
    },
    // 为了保证DOM已经渲染完成
    mounted() {
        setTimeout(() => {
            if (!this.$refs.wrapper) {
                return
            }
            this._initScroll()
        })
    },
    methods: {
        _initScroll() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
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
