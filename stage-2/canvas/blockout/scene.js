class Scene {
  static SCENE_WIDTH = 400
  static SCENE_HEIGHT = 550
  static PADDLE_WIDTH = 150
  static PADDLE_HEIGHT = 20
  static BALL_RADIUS = 20
  static BLOCK_ROWS = 7
  static BLOCK_COLS = 8
  static BLOCK_WIDTH = Scene.SCENE_WIDTH / Scene.BLOCK_COLS
  static BLOCK_HEIGHT = 20
  static MIN_ANGLE = 30
  static MAX_ANGLE = 90
  static CTX = null
  constructor(ctx) {
    this.ctx = ctx
    this.init()
  }
  init() {
    this.bindEvent()
    this.initBlocks()
    this.initPaddle()
    this.initBall()
    this.update()
  }
  bindEvent() {
    this.canEdit = false
    let self = this
    window.addEventListener('mousedown', e => {
      if (!self.isEdit) return; 
      self.canEdit = true
      let { target } = e
      if (self.canEdit && target.classList.contains('block')) {
        target.alive = !target.alive
      }
    })
    window.addEventListener('mouseup', e => {
      if (!self.isEdit) return; 
      self.canEdit = false
    })
    window.addEventListener('mousemove', e => {
      if (!self.isEdit) return; 
      let { target } = e
      if (self.canEdit && target.classList.contains('block')) {
        target.alive = !target.alive
      }
    })
  }
  initBlocks() {
    this.blocks = []
    let w = Scene.BLOCK_WIDTH
    let h = Scene.BLOCK_HEIGHT
    for (let i = 0; i < Scene.BLOCK_ROWS; i++) {
      for (let j = 0; j < Scene.BLOCK_COLS; j++) {
        let x = j * w
        let y = i * h
        this.blocks.push(new Block(w, h, x, y))
      }
    }
  }
  initPaddle() {
    let w = Scene.PADDLE_WIDTH
    let h = Scene.PADDLE_HEIGHT
    let x = (Scene.SCENE_WIDTH - w) / 2
    let y = Scene.SCENE_HEIGHT - 50
    this.paddle = new Paddle(w, h, x, y)
  }
  initBall() {
    let r = Scene.BALL_RADIUS
    let x = (Scene.SCENE_WIDTH - r) / 2
    let y = this.paddle.posY - r - 10
    this.ball = new Ball(r, r, x, y, '#007acc')
  }
  ballUpadte() {
    if (!this.ball) return
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      let block = this.blocks[i]
      if (!block.alive) {
        this.blocks.splice(i, 1)
        continue
      }
      if (this.ball.collide(block)) block.alive = false
    }
    this.ball.update()
  }
  paddleUpdate() {
    if (!this.paddle) return
    this.paddle.update()
    if (this.ball.collide(this.paddle)) {
      this.ball.angle += this.paddle.angle
      this.ball.posY = this.paddle.posY - this.ball.height
    }
  }
  blockUpdate() {
    this.blocks.forEach(e => e.update())
  }
  update() {
    let ctx = Scene.CTX
    ctx.clearRect(0, 0, Scene.SCENE_WIDTH, Scene.SCENE_HEIGHT)
    this.ballUpadte()
    this.paddleUpdate()
    this.blockUpdate()
    requestAnimationFrame(this.update.bind(this))
  }
}
class Sprite {
  constructor(width, height, posX, posY, color) {
    this.posX = posX
    this.width = width
    this.height = height
    this.posY = posY
    this.speedX = 0
    this.speedY = 0
    this.color = color || `#${Math.random().toString(16).substr(3, 6)}`
  }
  render() {
    let ctx = Scene.CTX
    ctx.fillStyle = this.color
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
  }
}
class Paddle extends Sprite {
  constructor(...args) {
    super(...args)
    this.init()
  }
  init() {
    this.vx = 5
    this.ax = .2
    this.min = -90
    this.max = 90
    this.angle = 0
    this.keydowns = {}
    this.actions = {}
    this.registAction('a', this.moveLeft.bind(this))
    this.registAction('d', this.moveRight.bind(this))
    this.bindEvent()
  }
  moveLeft() {
    this.posX -= this.vx
    if (this.angle > 0) this.angle = 0
    this.angle--
  }
  moveRight() {
    this.posX += this.vx
    if (this.angle < 0) this.angle = 0 
    this.angle++
  }
  updateAngle() {
    if (!this.keydowns['a'] && !this.keydowns['d']) this.angle = 0
    this.angle = Math.max(this.min, Math.min(this.angle, this.max))
  }
  bindEvent() {
    window.addEventListener('keydown', ev => {
      this.keydowns[ev.key] = true;
    })
    window.addEventListener('keyup', ev => {
      this.keydowns[ev.key] = false;
    })
  }
  registAction(key, callback) {
    this.actions[key] = callback;
  }
  edge() {
    let w = Scene.SCENE_WIDTH;
    if (this.posX < 0) this.posX = 0;
    if (this.posX > w - this.width) this.posX = w - this.width;
  }
  update() {
    this.edge()
    this.updateAngle()
    this.render()
    let actions = Object.keys(this.actions);
    actions.forEach(k => this.keydowns[k] && this.actions[k]())
  }
}
class Ball extends Sprite {
  constructor( ...args) {
    super(...args)
    this.init()
  }
  init() {
    this.speed = 4
    this.angle = 45
    this.minAngle = Scene.MIN_ANGLE
    this.maxAngle = Scene.MAX_ANGLE
    this.canMove = true
  }
  collide(sprite) {
    if (this.posX + this.width > sprite.posX &&
        this.posX < sprite.posX + sprite.width &&
        sprite.posY < this.posY + this.height / 2 &&
        this.posY + this.height / 2 < sprite.posY + sprite.height) {
      this.flipX()
      this.posX = this.vx > 0
        ? sprite.posX - this.width
        : sprite.posX + sprite.width
      return true
    }
    if (this.posY + this.height > sprite.posY && 
        this.posY < sprite.posY + sprite.height &&
        sprite.posX < this.posX + this.width / 2 &&
        this.posX + this.width / 2 < sprite.posX + sprite.width) {
      this.flipY()
      return true
    }
    return false
  }
  edge() {
    let w = Scene.SCENE_WIDTH, h = Scene.SCENE_HEIGHT
    if (this.posX <= 0 || this.posX >= w - this.width)
      this.angle *= -1
    if (this.posY <= 0 || this.posY >= h - this.height)
      this.angle = 180 - this.angle
  }
  move() {
    this.vx = this.speed * Math.sin(this.angle * Math.PI / 180)
    this.vy = this.speed * Math.cos(this.angle * Math.PI / 180)
    this.posX += this.vx
    this.posY += this.vy
  }
  flipX() {
      this.angle *= -1
  }
  flipY() {
    this.angle = 180 - this.angle
  }
  render() {
    let ctx = Scene.CTX
    let r = this.width / 2
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.posX + r, this.posY + r, r, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
  }
  update() {
    if (this.canMove) {
      this.edge()
      this.move()
      this.render()
    }
  }
}
class Block extends Sprite {
  constructor(...args) {
    super(...args)
    this.alive = true
  }
  update() {
    this.render()
  }
  render() {
    let ctx = Scene.CTX
    ctx.fillStyle = this.color
    ctx.fillRect(this.posX + 1, this.posY + 1, this.width - 2, this.height - 2)
  }
}





