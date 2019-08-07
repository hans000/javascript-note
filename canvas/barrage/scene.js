class Barrage {
  constructor(data, config={}) {
    this.data = data
    this.ctx = config.ctx
    this.width = config.width
    this.height = config.height
    this.delay = config.delay || 2000
    this.init()
  }
  init() {
    this.pass()
    this.ctx.font='18px 微软雅黑'
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    this.ctx.shadowBlur = 2
    this.tiles = []
    this.create()
    this.update()
  }
  setCtx(options={}) {
    Object.keys(options).forEach(e => this.ctx[e] = options[e])
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
      let count = Math.random() * 3 + 7 | 0
      while (count--) {
        if (this.data.length) {
          let per = this.data.shift()
          this.tiles.push(new Tile(this, per.text))
        } 
        break
      }
    }, this.delay)
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      let t = this.tiles[i]
      t.alive ? t.update() : this.tiles.splice(i, 1)
    }
    requestAnimationFrame(this.update.bind(this))
  }
}
class Tile {
  static speeds = [1.2, 0.4, 0.6, 0.8, 1]
  constructor(scene, text) {
    this.scene = scene
    this.text = text
    this.init()
  }
  init() {
    let { width, height } = this.scene
    let w = Number.parseInt(this.scene.ctx.font)
    this.posX = width;
    this.posY = this.initPosY(height, w)
    this.vx = Tile.speeds[Math.random() * Tile.speeds.length | 0] * -1
    this.alive = true
    this.life = 10000
    this.birth = new Date()
    this.color = '#fff'
    this.width = this.text.length * w
  }
  render() {
    let { ctx } = this.scene
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.posX, this.posY)
  }
  initPosY(height, w) {
    let y = Math.min(height * Math.random() + w, height - w)
    return ~~(y / w) * w
  }
  edge() {
    if (this.posX + this.width < 0) {
      this.alive = false
    }
  }
  update() {
    this.posX += this.vx
    this.edge()
    this.render()
  }
}