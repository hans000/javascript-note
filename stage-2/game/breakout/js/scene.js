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
  constructor(el, options) {
    this.el = el
    this.options = options
    this.init()
  }
  start() {
    this.isEdit && this.load()
    this.initPaddle()
    this.initBall()
    this.isEdit = false
  }
  load() {
    let cols = Scene.BLOCK_COLS
    let w = Scene.BLOCK_WIDTH
    let h = Scene.BLOCK_HEIGHT
    this.blockWrap.childNodes.forEach((e, i) => {
      e.classList.remove('edit')
      this.blocks[i].alive = false
      if (e.classList.contains('alive')) {
        let col = e.offsetLeft / w | 0
        let row = e.offsetTop / h | 0
        this.alive = true
        this.blocks[row * cols + col].alive = true
      }
    })
  }
  edit() {
    this.isEdit = true
    this.blockWrap.childNodes.forEach(e => {
      e.alive = false
      e.classList.add('edit')
    })
  }
  init() {
    this.initDOM()
    this.bindEvent()
    this.initBlocks()
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
  blockUpdate() {
    this.blockWrap.childNodes.forEach(e => {
      e.alive ? e.classList.add('alive') : e.classList.remove('alive')
    })
  }
  initBlocks() {
    this.blocks = []
    let w = Scene.BLOCK_WIDTH
    let h = Scene.BLOCK_HEIGHT
    for (let i = 0; i < Scene.BLOCK_ROWS; i++) {
      for (let j = 0; j < Scene.BLOCK_COLS; j++) {
        let dom = document.createElement('div')
        let x = j * w
        let y = i * h
        dom.classList.add('block', 'alive')
        dom.alive = true
        this.blockWrap.appendChild(dom)
        this.blocks.push(new Block(dom, w, h, x, y))
      }
    }
  }
  initPaddle() {
    let w = Scene.PADDLE_WIDTH
    let h = Scene.PADDLE_HEIGHT
    let x = (Scene.SCENE_WIDTH - w) / 2
    let y = Scene.SCENE_HEIGHT - 50
    this.paddle = new Paddle(this.paddleDOM, w, h, x, y)
  }
  initBall() {
    let r = Scene.BALL_RADIUS
    let x = (Scene.SCENE_WIDTH - r) / 2
    let y = this.paddle.posY - r - 10
    this.ball = new Ball(this.ballDOM, r, r, x, y)
  }
  initDOM() {
    let frg = document.createDocumentFragment()
    this.ballDOM = document.createElement('div')
    this.paddleDOM = document.createElement('div')
    this.blockWrap = document.createElement('div')
    this.ballDOM.classList.add('ball')
    this.paddleDOM.classList.add('paddle')
    this.blockWrap.classList.add('block-wrap')
    frg.appendChild(this.ballDOM)
    frg.appendChild(this.paddleDOM)
    frg.appendChild(this.blockWrap)
    this.el.appendChild(frg)
  }
  ballUpadte() {
    if (!this.ball) return
    this.blocks = this.blocks.filter(e => {
      return e.alive
    })
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      let block = this.blocks[i]
      this.ball.collide(block) && block.remove()
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
  update() {
    this.ballUpadte()
    this.paddleUpdate()
    this.blockUpdate()
    requestAnimationFrame(this.update.bind(this))
  }
}
class Sprite {
  constructor(dom, width, height, posX, posY) {
    this.dom = dom
    this.posX = posX
    this.width = width
    this.height = height
    this.posY = posY
    this.speedX = 0
    this.speedY = 0
  }
  init() {
    this.dom.style.width = this.width + 'px'
    this.dom.style.height = this.height + 'px'
    this.dom.style.left = this.posX + 'px'
    this.dom.style.top = this.posY + 'px'
  }
}
/**
 * 方块类
 */
class Block extends Sprite {
  constructor(...args) {
    super(...args)
    this.alive = true
    this.init()
  }
  init() {
    super.init()
  }
  remove() {
    this.alive = false
    this.dom.alive = false
    this.dom.classList.remove('alive')
  }
}
/**
 * 球类
 */
class Ball extends Sprite {
  constructor( ...args) {
    super(...args)
    this.init()
  }
  init() {
    super.init()
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
  // 边界检测
  edge() {
    let { offsetLeft: x, offsetTop: y } = this.dom
    let w = Scene.SCENE_WIDTH, h = Scene.SCENE_HEIGHT
    if (x <= 0 || x >= w - this.width) this.angle *= -1
    if (y <= 0 || y >= h - this.height) this.angle = 180 - this.angle
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
    this.dom.style.left = this.posX + 'px'
    this.dom.style.top = this.posY + 'px'
  }
  update() {
    if (this.canMove) {
      this.edge()
      this.move()
      this.render()
    }
  }
}
/**
 * paddle类
 */
class Paddle extends Sprite {
  constructor(...args) {
    super(...args)
    this.init()
  }
  init() {
    super.init()
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
    if (this.posX < 0) {
      this.posX = 0;
    }
    if (this.posX > w - this.width) {
      this.posX = w - this.width;
    }
  }
  render() {
    this.dom.style.left = this.posX + 'px'
  }
  update() {
    this.render()
    this.edge()
    this.updateAngle()
    let actions = Object.keys(this.actions);
    actions.forEach(k => this.keydowns[k] && this.actions[k]())
  }
}