<template>
    <div class="header">
        <div class="icon"></div>
        <h1 class="text">Chicken Music</h1>
    </div>
</template>

<script>
export default {
    name: 'header',
    data() {
        return {

        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"

  .header
    color :$color-theme
    font-size: 0
    text-align center;
    .icon
        display: inline-block
        vertical-align: top
        width:30px
        height:32px
        margin-top: 6px
        margin-right: 9px
        background-size: 30px 32px
        bg-image('logo')
    .text
        display: inline-block
        vertical-align: top
        line-height: 44px
        font-size : $font-size-large 
</style>