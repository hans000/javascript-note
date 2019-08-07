(function() {
  function Swiper(container, config) {
    this.container = container
    this.config = config
    this.init()
  }
  Swiper.prototype = {
    init() {
      this.actions = {}

      this.register('swiper__wrapper', this.wrapHander)
      this.register('swiper__pagination', this.pageHander)
      this.register('swiper__navigation', this.navHander)

      if (typeof this.container === 'string') {
        this.container = document.querySelector(this.container)
      }
      Array.from(this.container.children).forEach(e => {
        let a = this.actions[e.classList[0]]
        a && a(e)
      })

      // bindEvent
      this.bindEvent()
    },
    wrapHander(emt) {
      this.wrapper = emt
      let { offsetWidth: w, offsetHeight: h, children: items } = this.wrapper
      this.count = items.length
      for (let i = 0; i < this.count; i++) {
        let slider = items[i]
        slider.style.cssText = `transform: translateX(${i*w}px);`
      }
    },
    pageHander(emt) {
      let frg = document.createDocumentFragment()
      for (let i = 0; i < this.count; i++) {
        let dot = document.createElement('span')
        dot.index = i
        dot.classList.add('swiper__dot')
        if (!i) {
          this.activeDot = dot
          dot.classList.add('active')
        }
        frg.appendChild(dot)
      }
      emt.appendChild(frg)
    },
    navHander(emt) {
      let frg = document.createDocumentFragment()
      let prev = document.createElement('div')
      let next = document.createElement('div')
      prev.classList.add('swiper__nav-prev')
      next.classList.add('swiper__nav-next')
      frg.appendChild(prev)
      frg.appendChild(next)
      emt.appendChild(frg)
    },
    register(cls, callback) {
      this.actions[cls] = callback
    },
    turn(target) {
      this.active.classList.remove('active')
      target.classList.add('active')
      this.active = target
      let offset = target.index * this.wrapper.offsetWidth
      this.wrapper.style.cssText = `transform: translate(${-offset}px)`
    },
    bindEvent() {
      this.container.addEventListener('click', e => {
        let { target } = e
        if (target.classList.contains('swiper__dot') &&
        target.index !== this.index) {
          this.turn(target)
          return
        }
        if (target.classList.contains('swiper__nav-prev')) {
          // let index = this.active.index
          console.log(this.active);

          index = Math.min(index--, 0)
          this.turn(this.wrapper.children[index])
          return
        }
        if (target.classList.contains('swiper__nav-next')) {
          let index = this.active.index
          index = Math.max(index++, this.count - 1)
          this.turn(this.wrapper.children[index])
          return
        }
      })
    }
  }

  window.Swiper = Swiper
}())