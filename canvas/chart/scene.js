class Scene {
  static range = 10
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.count = 10
    this.init()
  }
  init() {
    this.tiles = []
    this.cd = 50
    this.tiles.push(new Tile(this, 3))
    this.tiles.push(new Tile(this, 1))
    this.tiles.push(new Tile(this, 2))
    this.tiles.push(new Tile(this, 5))
    this.tiles.push(new Tile(this, 4))
    this.mark = new Date()
    this.update()
  }
  canChange() {
    return Date.now() - this.mark >= this.cd
  }
  sort() {
    this.tiles.sort((a, b) => b.value - a.value)
  }
  add(tile) {
    this.tiles.push(tile)
  }
  updateRuler() {
    let maxObj = this.tiles[0]
    if (!maxObj) return
    let max = maxObj.value
    let dv = 10 ** ((~~max).toString().length) * 0.2
    let newRng = Math.ceil(max / dv) * dv
    if (Scene.range !== newRng) {
      this.filling = true
    }
    Scene.range = newRng
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.sort()
    this.updateRuler()
    this.tiles.slice(0, this.count).forEach((e, i) => {
      this.filling && (e.filling = true)
      e.update(i)
    })
    this.filling = false
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
    this.W = this.value * width / Scene.range
    this.posX = 0
    this.posY = this.order * Tile.TOTAL_HEIGHT
    this.segment = 50
    this.dw = this.W / this.segment
    this.dv = this.value / this.segment
    this.dy = 0
    this.index = 0
    this.filling = true
  }
  getWidth() {
    let { width } = this.scene
    return this.value * width / Scene.range
  }
  render() {
    let { ctx } = this.scene
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
    ctx.font = '16px 黑体'
    ctx.fillText(this.value, this.width + 16, this.posY + (14 + Tile.BAR_HEIGHT) / 2)
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
  stretch() {
    if (this.index === 0) {
      let W = this.getWidth()
      this.dw = (W - this.width) / this.segment
      this.index = 0
    }
    if (this.index++ === this.segment) {
      this.filling = false
      this.index = 0
      return
    }
    this.width += this.dw
  }
  update(i) {
    this.exchange(i)
    this.filling && this.stretch()
    this.render()
  }
}