class Scene {
  constructor() {
    this.init()
  }
  init() {
    this.time = 0
    setInterval(() => {
      this.time++     
    }, 100)
    this.update()
  }
  render() {
    ctx.clearRect(0, 0, 400, 400)
    this.drawPane()
    this.drawPoint()
    if (this.time > 40) this.drawRect()
    let { min, sec, hour } = this.getAngle()
    if (this.time > 75) this.drawScale(cx, cy, 4, 120, sec, '#de6655')
    if (this.time > 80) this.drawScale(cx, cy, 4, 100, min, '#666665')
    if (this.time > 90) this.drawScale(cx, cy, 4, 80, hour, '#666665')
    if (this.time > 100) this.drawPane2()
  }
  update() {
    this.render()
    requestAnimationFrame(this.update.bind(this))
  }
  drawRect() {
    let w = 6, h = 12, D = 180
    for (let i = 0; i < 12; i++) {
      let x = D * Math.cos(i * 360/12 * Math.PI / 180)
      let y = D * Math.sin(i * 360/12 * Math.PI / 180)
      let angle = (i * 360/12 + 90) * Math.PI / 180
      ctx.save()
      ctx.translate(cx + x, cy + y)
      if (this.time > 52 + i) this.drawScale(0, 0, w, h, angle, '#b70d0d')
      ctx.rotate(angle)
      ctx.font="24px Verdana";
      ctx.fillStyle = '#272727'
      if (this.time > 64 + i) ctx.fillText((i + 2) % 12 + 1, -10, 40)
      ctx.restore()
    }    
  }
  drawPoint() {
    let D = 170
    for (let i = 0; i < 60; i++) {
      let x = D * Math.sin(i * 360/60 * Math.PI / 180)
      let y = D * Math.cos(i * 360/60 * Math.PI / 180)
      if (this.time > 40 + i/4) this.drawArc(x + cx, y + cy, 3, '#a3a3a3')
    }
  }
  drawPane() {
    ~~(this.time/10) && this.drawArc(cx, cy, 200, '#ff1515')
    ~~(this.time/20) && this.drawArc(cx, cy, 190, '#b70d0d')
    ~~(this.time/30) && this.drawArc(cx, cy, 180, '#ffffff')
  }
  drawPane2() {
    this.drawArc(cx, cy, 10, '#e98778')
    this.drawArc(cx, cy, 8, '#eebab3')
    this.drawArc(cx, cy, 3, '#c24739')
  }
  /**
   * 获取当前时分秒的偏移角度
   */
  getAngle() {
    let d = new Date()
    let sec = d.getSeconds()
    let min = d.getMinutes()
    let hour = d.getHours()

    return {
      sec: (sec * 360/60 + 180) * Math.PI / 180,
      min: ((min + sec/60) * 360/60 + 180) * Math.PI / 180,
      hour: ((hour + min/60 + sec/60/60) * 360/12 + 180) * Math.PI / 180
    }
  }
  /**
   * @param {number} x 坐标x
   * @param {number} y 坐标y
   * @param {number} w 指针宽度
   * @param {number} h 指针高度
   * @param {number} angle 偏移角度
   * @param {string} color 颜色值
   */
  drawScale(x, y, w, h, angle, color='#000') {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(0 - w/2, 0, w, h)
    ctx.restore()  
  }
  /**
   * 
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} r 半径
   * @param {string} color 颜色值，如#ffffff
   */
  drawArc(x, y, r, color='#000') {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, r, 0, 6.28)
    ctx.fill()  
  }
  delayDraw(fn, ms=1000) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve(ms), ms)
    })
  }
}
