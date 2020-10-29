class Tile {
  static WIDTH = 50
  static HEIGHT = 50
  static PADDIGN_X = 20
  static PADDIGN_Y = 10
  constructor(scene, posX, posY, text) {
    this.scene = scene
    this.posX = posX
    this.posY = posY
    this.prev = null
    this.next = null
    this.text = text
    this.color = `#${Math.random().toString(16).substr(3, 6)}`
  }
  render() {
    let { WIDTH: w, HEIGHT: h, PADDIGN_X: x, PADDIGN_Y: y } = Tile
    let { ctx } = this.scene
    ctx.fillStyle = this.color
    ctx.fillRect(this.posX, this.posY, w, h)
    ctx.fillStyle = '#fff'
    ctx.font="20px Georgia"
    ctx.fillText(this.text, this.posX + 15, this.posY + 25)
  }
  update() {
    this.render()
  }
}

class Line {
  constructor(scene, parent, child) {
    this.scene = scene
    this.parent = parent
    this.child = child
  }
  render() {
    let { WIDTH: w, HEIGHT: h, PADDIGN_X: x } = Tile
    let { posX: px, posY: py } = this.parent
    let { posX: cx, posY: cy } = this.child
    let { ctx } = this.scene
    ctx.beginPath()
    ctx.moveTo(px + w, py + h / 2)
    ctx.lineTo(cx - x / 2, py + h / 2)
    ctx.lineTo(cx - x / 2, cy + h / 2)
    ctx.lineTo(cx, cy + h / 2)
    ctx.stroke()
    ctx.closePath()
  }
  update() {
    this.render()
  }
}

class Scene {
  static WIDTH = 500
  static HEIGHT = 500
  constructor(ctx, data) {
    this.data = data
    this.ctx = ctx
    this.init()
  }
  init() {
    this.tiles = []
    this.lines = []
    this.markX = 0
    this.markY = 0
    this.initTree(this.data)
    this.update()
  }
  initTree(node, max=0, i=0, par=null) {
    debugger
    let children = node.children
    if (children && children.length) {
      this.markX++
      
      // 操作子节点
      let Y = children.reduce((r, e, i) => {
        r += this.initTree(e, max, i, node)
        return r
      }, max)

      // 操作根节点
      this.markX--
      node.posX = (Tile.WIDTH + Tile.PADDIGN_X) * this.markX
      node.posY = Y / children.length

      // core
      this.tiles.push(new Tile(this, node.posX, node.posY, node.text))
      par && this.lines.push(new Line(this, par, node))
      return node.posY
    }
    // 操作根节点
    node.posX = (Tile.WIDTH + Tile.PADDIGN_X) * this.markX
    node.posY = (Tile.HEIGHT + Tile.PADDIGN_Y) * this.markY
    
    // core
    this.lines.push(new Line(this, par, node))
    this.tiles.push(new Tile(this, node.posX, node.posY, node.text))
    this.markY++
    return node.posY
  }
  update() {
    let { WIDTH: w, HEIGHT: h } = Scene
    this.ctx.clearRect(0, 0, w, h)
    this.tiles.forEach(e => e.update())
    this.lines.forEach(e => e.update())
    requestAnimationFrame(this.update.bind(this))
  }
}