import OriginJSONP from 'jsonp'

export default function jsonp(url, data, options) {
    url += url.indexOf('?') < 0 ? '?' + param(data) : param(data)
    return new Promise((resolve, reject) => {
        OriginJSONP(url, options, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function param(data) {
    let params = ''
    for (var k in data) {
        data[k] !== undefined ? data[k] : ''
        params += '&' + k + '=' + encodeURIComponent(data[k])
    }
    return params ? params.slice(1) : ''
}