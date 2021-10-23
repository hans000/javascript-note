class Enemy extends Sprite {
  constructor(scene) {
    super()
    this.scene = scene
    this.dx = .005
    this.dy = 0
    this.changeCB = 500
    this.canChange = true
    this.init()
  }
  init() {
    this.bulletCB = 2000
    this.attackTime = -1
    this.boomConfig = new Map([
      [2, [1.2, 1, 0.5]],
      [3, [1.6, 1.6, 1]]
    ])
  }
  collide(bullets, w, h) {
    if (this.posX < 0 - this.getWidth()) {
      this.dx = Math.random() * 0.01
    }
    if (this.posX > w + this.getWidth()) {
      this.dx = -Math.random() * 0.01
    }
    if (this.posY < 0 - this.getWidth()) {
      
    }
    if (this.posY > h + this.getWidth()) {
      this.alive = false
    }
    let bs = bullets.filter(e => e.type)
    for (const b of bs) {
      if (b.posX <= this.posX + this.getWidth() &&
          b.posX >= this.posX - b.getWidth() && 
          b.posY <= this.posY + this.getWidth() &&
          b.posY >= this.posY - b.getWidth()) {
        this.alive = false
        b.alive = false
        this.scene.killCount++
        this.boom()
        break
      }
    }
  }
  attack() {
    if (this.attackTime < 0) {
      let b = new Bullet(this.scene)
      b.sizeX = 1
      b.sizeY = 1
      b.type = 0
      b.vy = 0.8
      b.color = this.color
      b.posX = this.posX + b.getWidth() / 2
      b.posY = this.posY + b.getWidth()
      this.attackTime = this.bulletCB
      this.scene.bullets.push(b)
    }    
    this.attackTime -= 1000/60
  }
  boom() {
    let config = this.boomConfig.get(this.sizeX)
    if (config) {
      config.forEach(e => {
        let p = new Particle()
        p.life = 2000
        p.sizeX = e
        p.sizeY = e
        p.color = this.color
        p.vx = Math.random() * 0.1 - 0.05
        p.vy = Math.random() * 0.1 - 0.05
        p.posX = this.posX
        p.posY = this.posY
        this.scene.particles.push(p)
      })
    }
  }
  changeX() {
    if (Math.random() - .5 > 0) {
      this.dx *= -1
    }
  }
  changeY() {
    if (Math.random() - .5 > 0) {
      this.dy *= -1
    }
  }
  change() {
    if (Date.now() - this.changeTime > this.changeCB) {
      this.canChange = true
    }
    if (this.canChange) {
      this.canChange = false
      this.changeX()
      this.changeY()
    }
  }
  update() {
    this.change()
    this.attack()
    this.posX += this.vx
    this.posY += this.vy
    this.vx += this.dx
    this.vy += this.dy
    this.render()
  }
}