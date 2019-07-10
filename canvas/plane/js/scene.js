class SceneBase {
  static WIDTH = 500;
  static HEIGHT = 600;
  static START = true;
  constructor() {
  }
  init() {
    return this;
  }
  update() {

  }
}

class GameScene extends SceneBase {
  constructor() {
    super();
    this.setEnemyCD = 3000;
  }
  init() {
    super.init();
    this.createEnemyTime = -1
    this.bullets = [];
    this.enemys = [];
    this.particles = [];
    this.initPlayer();
    this.initEnemy();
    this.warn = false;
    this.killCount = 0;
  }
  initPlayer() {
    this.player = new Player(this);
    this.player.vx = 2;
    this.player.vy = 2;
    this.player.posX = SceneBase.WIDTH / 2 - this.player.getWidth();
    this.player.posY = SceneBase.HEIGHT - this.player.getWidth();
  }
  initEnemy() {
    if (this.createEnemyTime < 0) {
      let count = Math.random() * 3 + 1 | 0;
      while (count--) {
        this.createEnemy();
      }
      this.createEnemyTime = this.setEnemyCD
    }
    this.createEnemyTime -= 1000/60
  }
  createEnemy() {
    let e = new Enemy(this);
    e.vx = 0;
    e.vy = 0.5 + Math.random();
    e.sizeX = Math.random() * 3 + 1 | 0;
    e.sizeY = e.sizeX;
    e.color = `hsl(${Math.random() * 256 | 0}, ${Math.random() * 40 + 40 | 0}%, ${Math.random() * 60 + 40 | 0}%)`;
    e.posX = Math.random() * SceneBase.WIDTH;
    e.posY = 0 - e.getWidth();
    this.enemys.push(e);
  }
  warning() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.fillRect(0, 0, SceneBase.WIDTH, SceneBase.HEIGHT);
    ctx.fill();
  }
  updateBullet() {
    this.bullets.forEach(e => e.update())
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let b = this.bullets[i];
      b.collide(SceneBase.WIDTH, SceneBase.HEIGHT);
      b.alive ? b.update() : this.bullets.splice(i, 1);
    }
  }
  updateParticle() {
    this.particles.forEach(e => e.update())
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let b = this.particles[i];
      b.alive ? b.update() : this.particles.splice(i, 1);
    }    
  }
  updateEnemy() {
    for (let i = this.enemys.length - 1; i >= 0; i--) {
      let e = this.enemys[i];
      e.collide(this.bullets, SceneBase.WIDTH, SceneBase.HEIGHT)
      if (e.alive) {
        e.update()
      } else {
        this.enemys.splice(i, 1);
      }
    }
  }
  updateInfo() {
    ctx.fillStyle = '#fff'
    ctx.font = '20px Georgia'
    ctx.fillText(`调试信息`, 10, 20);
    ctx.fillText(`子弹数量${this.bullets.length}`, 10, 40);
    ctx.fillText(`敌人数量${this.enemys.length}`, 10, 60);
    ctx.fillText(`击杀数量${this.killCount}`, 10, 80);
  }
  update() {
    super.update();
    this.initEnemy();
    if (this.warn) {
      this.warning();
      this.warn = false;
    } else {
      ctx.clearRect(0, 0, SceneBase.WIDTH, SceneBase.HEIGHT);
    }
    this.player.update();
    this.updateBullet();
    this.updateParticle();
    this.updateEnemy();
    this.updateInfo();
  }
}