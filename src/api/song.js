import {
  commonParams,
  options
} from 'common/js/config'
import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {
  getUid
} from 'common/js/uid'

export function getLyric(mid) {
  // const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?'
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    // console.log('res.data', res.data)
    return Promise.resolve(res.data)
  })
}

export function getVKey(songmid, filename) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, commonParams, {
    cid: 205361747,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  })
  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }))
}
