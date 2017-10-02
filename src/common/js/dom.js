export function addClass(el, className) {
    if (!hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(reg)
}

export function getData(el, name, value) {
    const prefix = 'data-'
    if (value) {
        return el.setAttribute(prefix + name, value)
    } else {
        return el.getAttribute(prefix + name)
    }
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transformNames = {
        Webkit: 'webkitTransform',
        Moz: 'MozTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }
    return false
})()

export function prefixStyle(style) {
    if (vendor === false) {
        return false
    } else if (vendor === 'standard') {
        return style
    } else {
        return vendor + style.charAt(0).toUpperCase() + style.substring(1)
    }
}