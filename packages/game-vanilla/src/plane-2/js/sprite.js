class Sprite {
  constructor() {
    this.unit = 10;
    this.vx = 0.2;
    this.vy = 0.2;
    this.sizeX = 2;
    this.sizeY = 2;
    this.posX = 0;
    this.posY = 0;
    this.color = '#369';
    this.alive = true;
    this.birth = new Date();
  }
  getWidth() {
    return this.sizeX * this.unit;
  }
  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.getWidth(), this.getWidth());
    ctx.closePath();
    ctx.fill();
  }
}