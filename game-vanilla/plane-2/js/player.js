class Player extends Sprite {
  constructor(scene, ...args) {
    super(...args);
    this.scene = scene;
    this.init();
  }
  init() {
    this.keydowns = {};
    this.actions = {};
    this.bulletCB = 800;
    this.attackTime = -1;
    this.registAction('a', this.moveLeft.bind(this));
    this.registAction('d', this.moveRight.bind(this));
    this.registAction('w', this.moveUp.bind(this));
    this.registAction('s', this.moveDown.bind(this));
    this.bindEvent();
  }
  moveLeft() {
    this.posX -= this.vx;
  }
  moveRight() {
    this.posX += this.vx;
  }
  moveUp() {
    this.posY -= this.vy;
  }
  moveDown() {
    this.posY += this.vy;
  }
  attack() {
    if (this.attackTime < 0) {
      let b = new Bullet(this.scene);
      b.vy = -1.5;
      b.sizeX = 1;
      b.sizeY = 1;
      b.type = 1;
      b.color = '#fff'
      b.posX = this.posX + b.getWidth() / 2;
      b.posY = this.posY - b.getWidth();
      this.attackTime = this.bulletCB;
      this.scene.bullets.push(b);
    }
    this.attackTime -= 1000/60
  }
  edge() {
    let w = SceneBase.WIDTH, h = SceneBase.HEIGHT;
    if (this.posX < 0) {
      this.posX = 0;
    }
    if (this.posX > w - this.getWidth()) {
      this.posX = w - this.getWidth();
    }
    if (this.posY < 0) {
      this.posY = 0; 
    }
    if (this.posY > h - this.getWidth()) {
      this.posY = h - this.getWidth();
    }
  }
  collide(sprite) {
    return (
      sprite.posX <= this.posX + this.getWidth() &&
      sprite.posX >= this.posX - sprite.getWidth() &&
      sprite.posY <= this.posY + this.getWidth() &&
      sprite.posY >= this.posY - sprite.getWidth())
  }
  damage() {
    // player 与子弹碰撞判定
    let bs = this.scene.bullets.filter(e => !e.type);
    for (const b of bs) {
      if (this.collide(b)) {
          b.alive = false;
          this.scene.warn = true;
        break;
      }
    }
    // player 与敌人战机碰撞判定
    let es = this.scene.enemys;
    for (const e of es) {
      if (this.collide(e)) {
          e.alive = false;
          this.scene.warn = true;
        break;
      }
    }
  }
  registAction(key, callback) {
    this.actions[key] = callback;
  }
  bindEvent() {
    window.addEventListener('keydown', ev => {
      this.keydowns[ev.key] = true;
    })
    window.addEventListener('keyup', ev => {
      this.keydowns[ev.key] = false;
    })
  }
  update() {
    this.edge();
    this.damage();
    let actions = Object.keys(this.actions);
    actions.forEach(k => this.keydowns[k] && this.actions[k]())
    this.attack();
    this.render();
  }
}