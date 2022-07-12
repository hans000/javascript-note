class Particle extends Sprite {
  constructor() {
    super();
    this.life = 1000;
    this.sizeX = .5;
    this.sizeY = .5;
  }
  update() {
    const delta = new Date() - this.birth
    if (delta > this.life) {
      this.alive = false;
    }
    this.posX += this.vx;
    this.posY += this.vy;
    // const size = (this.life - delta) / this.life //* this.sizeX
    // this.sizeX = size
    // this.sizeY = size
    this.render();
  }
}