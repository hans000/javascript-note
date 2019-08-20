export const on = (el, type, handler) => {
  if (el && type && handler) {
    el.addEventListener(type, handler)
  }
}

export const off = (el, type, handler) => {
  if (el && type && handler) {
    el.removeEventListener(type, handler)
  }
}