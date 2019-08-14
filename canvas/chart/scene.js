class Scene {
  static ruler = 20
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.count = 10
    this.init()
  }
  init() {
    this.tiles = []
    this.update()
  }
  sort() {
    this.tiles.sort((a, b) => b.value - a.value)
  }
  add(tile) {
    this.tiles.push(tile)
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.sort()
    this.tiles.slice(0, this.count).forEach((e, i) => {
      e.update(i)
    })
    requestAnimationFrame(this.update.bind(this))
  }
}

class Tile {
  static TOTAL_HEIGHT = 40
  static BAR_HEIGHT = 30
  constructor(scene, value) {
    this.scene = scene
    this.value = value
    this.order = scene.tiles.length
    this.init()
  }
  init() {
    let { width } = this.scene
    this.height = Tile.BAR_HEIGHT
    this.width = 0
    this.currVal = 0
    this.filled = false
    this.W = this.value * width / Scene.ruler
    this.posX = 0
    this.posY = this.order * Tile.TOTAL_HEIGHT
    this.segment = 50
    this.dw = this.W / this.segment
    this.dv = this.value / this.segment
    this.dy = 0
  }
  render() {
    let { ctx } = this.scene
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
    ctx.font = '16px 黑体'
    ctx.fillText(this.currVal, this.width + 16, this.posY + (14 + Tile.BAR_HEIGHT) / 2)
  }
  exchange(i) {
    let Y = i * Tile.TOTAL_HEIGHT
    if (i !== this.order) {
      this.dy = (Y - this.posY) / this.segment
      this.order = i
    }
    this.posY += this.dy
    if (this.dy > 0) this.posY = Math.min(this.posY, Y)
    if (this.dy < 0) this.posY = Math.max(this.posY, Y)
  }
  filling() {
    if (!this.filled) {
      this.width += this.dw
      this.currVal += this.dv
      this.currVal = +this.currVal.toFixed(2)
    }
    if (this.width >= this.W) {
      this.filled = true
    }
  }
  update(i) {
    this.filling()
    this.exchange(i)
    this.render()
  }
}