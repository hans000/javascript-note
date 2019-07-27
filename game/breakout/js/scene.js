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
      let c = this.ball.collide(block)
      if (c) {
        c === 1 ? this.ball.flipY() : this.ball.flipX()
        block.remove()
      }
    }
    this.ball.update()
  }
  paddleUpdate() {
    if (!this.paddle) return
    this.paddle.update()
    let c = this.paddle.collide(this.ball)
    if (c) {
      c === 1 ? this.ball.flipY() : this.ball.flipX()
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
  collide(sprite) {
    let dx1 = this.posX + this.width - sprite.posX
    let dx2 = sprite.posX + sprite.width - this.posX
    let dx = Math.min(dx1, dx2)
    let dy1 = this.posY + this.height - sprite.posY
    let dy2 = sprite.posY + sprite.height - this.posY
    let dy = Math.min(dy1, dy2)
    if (dx >=0 && dy >= 0) {
      if (dy - dx > 0) {
        return 2
      }
      return 1
    }
    return 0
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
    this.vx = -2
    this.vy = -2
    this.canMove = true
  }
  edge() {
    let { offsetLeft: x, offsetTop: y } = this.dom
    let w = Scene.SCENE_WIDTH, h = Scene.SCENE_HEIGHT
    if (x <= 0 || x >= w - this.width) {
      this.vx *= -1
    }
    if (y <= 0 || y >= h - this.height) {
      this.vy *= -1
    }
  }
  move() {
    this.posX += this.vx
    this.posY += this.vy
  }
  flipX() {
    this.vx *= -1
  }
  flipY() {
    this.vy *= -1
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
    this.keydowns = {}
    this.actions = {}
    this.registAction('a', this.moveLeft.bind(this))
    this.registAction('d', this.moveRight.bind(this))
    this.bindEvent()
  }
  moveLeft() {
    this.posX -= this.vx
  }
  moveRight() {
    this.posX += this.vx
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
    let actions = Object.keys(this.actions);
    actions.forEach(k => this.keydowns[k] && this.actions[k]())
  }
}