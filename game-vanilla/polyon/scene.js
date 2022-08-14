class Scene {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.init()
  }
  init() {
    this.actors = []
    this.update()
  }
  clear() {
    this.actors = []
  }
  add(polygon) {
    this.actors.push(polygon)
  }
  setOutline(flag) {
    this.actors.forEach(e => e.outline = !!flag)
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.actors.forEach(e => e.update())
    requestAnimationFrame(this.update.bind(this))
  }
}

class Util {
  static sin(angle) {
    return Math.sin(angle * Math.PI / 180)
  }
  static cos(angle) {
    return Math.cos(angle * Math.PI / 180)
  }
}

class Polygon {
  constructor(scene, count=3, posX=0, posY=0, radius=10, angle=0) {
    this.scene = scene
    this.count = count
    this.posX = posX
    this.posY = posY
    this.radius = radius
    this.angle = angle
    this.init()
  }
  init() {
    this.outline = false
    this.initCalcPoints()
    this.ball = new Ball(this.scene)
  }
  setSpeed(val) {
    this.ball.speed = val
  }
  initCalcPoints() {
    let per = 360 / this.count
    this.points = []
    for (let i = 0; i < this.count; i++) {
      let x = Util.cos(this.angle + i * per + 180) * this.radius + this.posX
      let y = Util.sin(this.angle + i * per + 180) * this.radius + this.posY
      this.points.push({ x, y })
    }
  }
  render() {
    let { ctx } = this.scene
    ctx.beginPath()
    this.points.forEach((e, i) => {
      i ? ctx.lineTo(e.x, e.y) : ctx.moveTo(e.x, e.y)
    })
    ctx.closePath()
    ctx.stroke()
  }
  diff() {
    let whichEdge = this.ball.distance / this.radius % this.count | 0
    let lenEdge = this.ball.distance % this.radius
    let rate = lenEdge / this.radius
    let p2 = this.points[((whichEdge + 1) % this.count)]
    let p1 = this.points[whichEdge]
    let x = rate * (p2.x - p1.x) + p1.x
    let y = rate * (p2.y - p1.y) + p1.y
    return { x, y }
  }
  update() {
    this.ball.update(this.diff())
    this.outline && this.render()
  }
}

class Ball {
  constructor(scene) {
    this.scene = scene
    this.init()
  }
  init() {
    this.posX = 0
    this.posY = 0
    this.color = 'pink'
    this.radius = 15
    this.distance = 0
    this.speed = 2
  }
  render() {
    let { ctx } = this.scene
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }
  update({ x, y }) {
    this.distance += this.speed
    this.posX = x
    this.posY = y
    this.render()
  }
}