export function shuffle(arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomInt(0, i)
    const z = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = z
  }
  return _arr
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
