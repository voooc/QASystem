// 节流
export function throttle (fn, delay) {
  let timer = null
  let starttime = Date.now()
  return function () {
    const curTime = Date.now()
    const remaining = delay - (curTime - starttime) // 从上一次到现在，还剩下多少多余时间
    const context = this
    const args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      fn.apply(context, args)
      starttime = Date.now()
    } else {
      timer = setTimeout(fn, remaining)
    }
  }
}
// 防抖
export function debounce (func, wait = 1000, immediate = true) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}
