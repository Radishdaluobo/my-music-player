// action一般处理异步操作或则对mutation的封装,比如某个动作需要触发多个mutation的时候
import * as types from './mutation-types'

export const selectPlay = function({ commit, state }, { list, index }) {
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_CURRENT_INDEX, index)
}