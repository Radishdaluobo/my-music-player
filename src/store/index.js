import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './action'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
    // 会检测state的修改是不是来源于mutations,否则会报警告
    // 该模式开启会有性能损耗,所以不建议在线上使用
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    strict: debug,
    plugins: debug ? [createLogger()] : [] // 通过mutation修改state会在控制台打印logger
})