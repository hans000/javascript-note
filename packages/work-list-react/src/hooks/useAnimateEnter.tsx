import { useEffect, useRef } from 'react'

function isElementVisible(el: Element) {
  const rect = el.getBoundingClientRect()
  const vWidth = window.innerWidth || document.documentElement.clientWidth
  const vHeight = window.innerHeight || document.documentElement.clientHeight
   
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  ) {
    return false
  }
 
  return true
}

const stack: HTMLElement[] = []

function handleAnimate(root: HTMLElement) {

  const removeNodes = root.querySelectorAll('.es-enter-out')
  removeNodes.forEach(node => {
    if (! isElementVisible(node)) {
      const index = stack.findIndex(item => item === node)
      if (index !== -1) {
        stack.splice(index, 1)
      }
      node.classList.remove('es-enter-out')
      node.classList.add('es-enter-mark')
    }
  })

  const nodes = root.querySelectorAll('.es-enter-mark')
  nodes.forEach(node => {
    if (isElementVisible(node)) {
      stack.push(node as HTMLElement)
      node.classList.remove('es-enter-mark')
      node.classList.add('es-enter-out')
    }
  })
}

export default function useAnimateEnter<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const timerRef = useRef<number>()

  useEffect(
    () => {
      const root = ref.current
      if (root) {
        const handle = () => {
          handleAnimate(root)
        }
        setTimeout(handle, 0)
        window.addEventListener('scroll', handle)
        timerRef.current = window.setInterval(() => {
          const node = stack.shift()
          if (node) {
            node.classList.add('es-enter')
          }
        }, 200)
        return () => {
          window.removeEventListener('scroll', handle)
          window.clearInterval(timerRef.current)
        }
      }
    },
    []
  )

  return ref
}