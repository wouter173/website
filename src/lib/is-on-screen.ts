import "client-only"

export function isOnScreen(elm: HTMLElement) {
  var rect = elm.getBoundingClientRect()
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}
