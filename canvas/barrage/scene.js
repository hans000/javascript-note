class Util {
  static rand(min=0, max=10, bit=0) {
    return +(Math.random() * (max - min) + min | 0).toFixed(bit)
  }
}
class Barrage {
  constructor(data, config={}) {
    this.data = data
    this.ctx = config.ctx
    this.width = config.width
    this.height = config.height
    this.delay = config.delay || 1000
    this.init()
  }
  init() {
    this.pass()
    this.on = false
    this.ctx.font='18px 微软雅黑'
    this.rowCount = this.height / Number.parseInt(this.ctx.font) | 0
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    this.ctx.shadowBlur = 2
    this.initChunks()
  }
  start() {
    this.on = true
    this.create()
    this.update()
  }
  stop() {
    this.on = false
    clearInterval(this.timer)
  }
  setCtx(options={}) {
    Object.keys(options).forEach(e => this.ctx[e] = options[e])
  }
  initChunks() {
    this.chunks = []
    for (let i = 0; i < this.rowCount; i++) {
      this.chunks.push(new Chunk(this, i))
    }
  }
  pass() {
    let store = ['data', 'ctx', 'width', 'height']
    store.forEach(e => {
      if (!this[e]) {
        throw new TypeError(`${e}没有被赋值`)
      }
    })
  }
  create() {
    this.timer = setInterval(_=> {
      let count = Util.rand(3, 7)
      while (count--) {
        if (this.data.length) {
          let per = this.data.shift()
          let row = Util.rand(0, this.rowCount)
          this.chunks[row].add(per.text)
        } 
        break
      }
    }, this.delay)
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.chunks.forEach(e => e.update())
    requestAnimationFrame(this.update.bind(this))
  }
}
class Chunk {
  static speeds = [1.2, 0.4, 0.6, 0.8, 1]
  constructor(scene, order) {
    this.scene = scene
    this.order = order
    this.init()
  }
  init() {
    this.tiles = []
    this.updateSpeed()
    this.cd = true
  }
  add(text) {
    let w = this.scene.width
    let h = Number.parseInt(this.scene.ctx.font) * (this.order + 1)
    this.tiles.push(new Tile(this, text, w, h))
    this.cd = true
  }
  updateSpeed() {
    if (this.cd && !this.tiles.length) {
      let num = Util.rand(0, Chunk.speeds.length)
      this.vx = Chunk.speeds[num]
      this.cd = false
    }
  }
  update() {
    this.updateSpeed()
    let pass = true
    let mark = -1
    for (let i = 0; i < this.tiles.length; i++) {
      let t = this.tiles[i]
      if (t.alive) {
        if (pass) {
          t.update(this.vx)
        }
        if (t.edgeRight()) {
          pass = false
          continue
        }
      } else {
        mark = i
      }
    }
    if (mark !== -1) {
      this.tiles.splice(0, ++mark)
    }
  }
}
class Tile {
  static speeds = [1.2, 0.4, 0.6, 0.8, 1]
  constructor(chunk, text, posX, posY) {
    this.chunk = chunk
    this.text = text
    this.posX = posX
    this.posY = posY
    this.init()
  }
  init() {
    let { ctx } = this.chunk.scene
    let h = Number.parseInt(ctx.font)
    this.alive = true
    this.life = 10000
    this.birth = new Date()
    this.color = '#fff'
    this.width = this.text.length * h
  }
  render() {
    let { ctx } = this.chunk.scene
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.posX, this.posY)
  }
  edgeLeft() {
    if (this.posX + this.width < 0) {
      this.alive = false
    }
  }
  edgeRight() {
    return this.posX + this.width > this.chunk.scene.width
  }
  update(vx) {
    this.posX -= vx
    this.edgeLeft()
    this.render()
  }
}