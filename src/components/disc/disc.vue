<template>
    <transition name='slide'>
        <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    title() {
        return this.getDisc.dissname
    },
    bgImage() {
        return this.getDisc.imgUrl
    },
    ...mapGetters([
        'getDisc'
    ])
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s
.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
