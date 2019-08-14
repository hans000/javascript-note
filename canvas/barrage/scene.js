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
    this.valide()
    this.on = false
    this.ctx.font='18px 微软雅黑'
    this.rowCount = this.height / Number.parseInt(this.ctx.font) | 0
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    this.ctx.shadowBlur = 2
    this.initTracks()
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
  initTracks() {
    this.tracks = []
    for (let i = 0; i < this.rowCount; i++) {
      this.tracks.push(new Track(this, i))
    }
  }
  valide() {
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
          this.tracks[row].add(per.text, Track.COLORS[Util.rand(0, 4)], per.type)
        } 
        break
      }
    }, this.delay)
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.tracks.forEach(e => e.update())
    requestAnimationFrame(this.update.bind(this))
  }
}
class Track {
  static SPEEDS = [1.2, 0.6, 0.9, 1.5]
  static COLORS = ['#fff', '#00cf80', '#e70012', '#ffb02c']
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
  add(text, color, type) {
    let w = this.scene.width
    let h = Number.parseInt(this.scene.ctx.font) * (this.order + 1)
    let tile = type
        ? new RollTile(this, text, color, w, h)
        : new StaticTile(this, text, color, w, h)
    this.tiles.push(tile)
    this.cd = true
  }
  updateSpeed() {
    if (this.cd && !this.tiles.length) {
      let num = Util.rand(0, Track.SPEEDS.length)
      this.vx = Track.SPEEDS[num]
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
class TileBase {
  constructor(Track, text, color='#fff', posX, posY) {
    this.Track = Track
    this.text = text
    this.color = color
    this.posX = posX
    this.posY = posY
    this.init()
  }
  init() {
    this.alive = true
  }
  render() {
    let { ctx } = this.Track.scene
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.posX, this.posY)
  }
  getTextWidth() {
    let { ctx } = this.Track.scene
    return ctx.measureText(this.text).width
  }
  update() {
    this.render()
  }
}
class RollTile extends TileBase {
  constructor(...args) {
    super(...args)
  }
  init() {
    super.init()
  }
  edgeLeft() {
    if (this.posX + this.getTextWidth() < 0) {
      this.alive = false
    }
  }
  edgeRight() {
    return this.posX + this.getTextWidth() > this.Track.scene.width
  }
  update(vx) {
    this.posX -= vx
    this.edgeLeft()
    this.render()
  }
}
class StaticTile extends TileBase {
  constructor(...args) {
    super(...args)
  }
  init() {
    super.init()
    this.life = 1000
    this.alive = true
    this.birth = new Date()
    this.setPosition()
  }
  setPosition() {
    let { width: W } = this.Track.scene
    let w = this.getTextWidth()
    this.posX = (W - w) / 2
  }
  exist() {
    if (Date.now() - this.birth > this.life) {
      this.alive = false
    }
  }
  update() {
    this.exist()
    this.alive && this.render()
  }

}