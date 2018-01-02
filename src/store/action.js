// action一般处理异步操作或则对mutation的封装,
// 比如某个动作需要触发多个mutation的时候
import { shuffle } from 'common/js/util'
import * as types from './mutation-types'
import { playMode } from 'common/js/config'

function findIndex (arr, song) {
  // 注意这里有两个return
  return arr.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.Mode === playMode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAYLIST, randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
}

export const randomPlay = function({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, list)
  const _list = shuffle(list)
  commit(types.SET_PLAYLIST, _list)
  commit(types.SET_CURRENT_INDEX, 0)
}
