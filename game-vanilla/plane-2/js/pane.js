class Pane {
  constructor(data) {
    this.title = data.title
    this.ctrl = data.ctrl
    this.init()
  }
  add(el, func) {
    let obj = document.createElement('div')
    obj.innerHTML = el
    obj.onclick = func
    this.ctrlDOM.appendChild(obj)
  }
  init() {
    let frg = document.createDocumentFragment()

    this.paneDOM = document.createElement('div')
    this.paneDOM.classList.add('pane')

    this.titleDOM = document.createElement('div')
    this.titleDOM.classList.add('title')
    this.titleDOM.innerHTML = this.title

    this.ctrlDOM = document.createElement('div')
    this.ctrlDOM.classList.add('ctrl')

    this.paneDOM.appendChild(this.titleDOM)
    this.paneDOM.appendChild(this.ctrlDOM)

    frg.appendChild(this.paneDOM)
    body.appendChild(frg)

    this.ctrl.forEach(e => this.add(e.name, e.func))
    this.bindEvent()
  }
  show() {
    this.paneDOM.style.display = 'block'
  }
  hidden() {
    this.paneDOM.style.display = 'none'
  }
  bindEvent() {
    this.paneEventHandler()
  }
  paneEventHandler() {
    this.titleDOM.onmousedown = (e) => {
      this.titleDOM.flag = true
      this.paneDOM.ox = this.paneDOM.getBoundingClientRect().left
      this.paneDOM.oy = this.paneDOM.getBoundingClientRect().top
      this.paneDOM.sx = e.clientX - this.paneDOM.ox
      this.paneDOM.sy = e.clientY - this.paneDOM.oy
    }
    document.addEventListener('mouseup', () => {
      this.titleDOM.flag = false
    })
    document.addEventListener('mousemove', (e) => {
      if (e.target === this.titleDOM && this.titleDOM.flag) {
        let dx = this.paneDOM.sx
        let dy = this.paneDOM.sy
        this.paneDOM.style.left = e.clientX - dx + 'px'
        this.paneDOM.style.top = e.clientY - dy + 'px'
      }
    })
  }
}