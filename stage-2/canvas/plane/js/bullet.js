class Bullet extends Sprite {
  constructor(scene) {
    super();
    this.scene = scene;
    this.vx = 0;
    this.vy = -1;
    this.state = new Date();
    this.particleCB = 500;
    this.type = 0;  // 0 enemy, 1 player
  }
  collide(w, h) {
    if (this.posX < 0 - this.getWidth() ||
        this.posX > w + this.getWidth() ||
        this.posY < 0 - this.getWidth() ||
        this.posY > h + this.getWidth()) {
      this.alive = false;
    }
  }
  createParticle() {
    let p = new Particle();
    p.vx = Math.random() - .5;
    p.vy = Math.random() - .5;
    p.color = `#${Math.random().toString(16).substr(3, 6)}`;
    p.posX = this.posX + this.getWidth();
    p.posY = this.posY + this.getWidth();
    this.scene.particles.push(p);
  }
  update() {
    if (new Date() - this.state >= this.particleCB) {
      this.createParticle();
      this.state = new Date();
    }
    this.posX += this.vx;
    this.posY += this.vy;
    this.render();
  }
}