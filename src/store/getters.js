// 箭头函数的简写,实际上就是一个function return了一个state.singer
// 习惯用getter取数据
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen
// 播放时的歌单顺序
export const playList = state => state.playList
// 歌单序列
export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const getDisc = state => state.disc

// 这里相当于计算属性
export const currentSong = state => {
    // 边界处理
    return state.playList[state.currentIndex] || {}
}
