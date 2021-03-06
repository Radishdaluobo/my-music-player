import { mapGetters } from 'vuex'
// import {mapGetters, mapMutations, mapActions} from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  },
  method: {
    handlePlayList() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
