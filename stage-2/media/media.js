class Media {
  constructor(dom) {
    this.dom = dom
    this.init()
  }
  init() {
    this.canPlay = false
    this.bindEvent()
  }
  load(url) {
    this.dom.src = url
  }
  setVolume(val) {
    this.dom.volume = val
  }
  getVolume() {
    return this.dom.volume
  }
  bindEvent() {
    this.dom.addEventListener('canplay', e => {
      this.loaded && this.loaded()
      this.canPlay = true
    })
    this.dom.addEventListener('durationchange', e => {
      this.duration = this.dom.duration
    })
    this.dom.addEventListener('timeupdate', e => {
      this.update && this.update()
    })
  }
  play() {
    this.canPlay && this.dom.play()
  }
  pause() {
    this.dom.pause()
  }
  setCurrentTime(sencond) {
    this.dom.currentTime = sencond
  }
  getCurrentTime() {
    return this.dom.currentTime
  }
}