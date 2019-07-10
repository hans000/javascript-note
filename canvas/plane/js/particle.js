class Particle extends Sprite {
  constructor() {
    super();
    this.life = 1000;
  }
  update() {
    if (new Date() - this.birth > this.life) {
      this.alive = false;
    }
    this.posX += this.vx;
    this.posY += this.vy;
    this.render();
  }
}