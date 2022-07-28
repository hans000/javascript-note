function Ball(data) {
  this.posX = data.posX || 0;
  this.posY = data.posY || 0;
  this.radius = data.radius || 10;
  this.vx = data.vx || Math.random() - 0.5;
  this.vy = data.vy || Math.random() - 0.5;
  this.alive = true;
  this.canMove = false;
  this.birth = null;
  this.light = false;
  this.color = data.color || `#${Math.random().toString(16).substr(3, 6)}`;
}
Ball.prototype = {
  init(data) {
    this.initData(data);
    this.blender();
    return this;
  },
  initData(data) {
    this.WIDTH = data.WIDTH;
    this.HEIGHT = data.HEIGHT;
    this.ctx = data.ctx;
    this.life = 1000 * 15;
    this.gravity = 0.08;
    this.bounce = -0.7;
  },
  blender() {
    this.ctx.fillStyle = this.light ? this.color : '#aaa';
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  },
  toString() {
    return `alive:${this.alive};posX:${this.posX};posY:${this.posY};vx:${this.vx};vy:${this.vy};light:${this.light};bounce:${this.bounce};gravity:${this.gravity};radius:${this.radius};canMove:${this.canMove}`
  },
  collide() {
    if (new Date() - this.birth > this.life) {
      this.alive = false;
    }
    if (this.posX - this.radius <= 0 || this.posX >= WIDTH) {
      this.alive = false;
    }
    if (this.posY - this.radius <= 0 || this.posY + this.radius >= HEIGHT) {
      this.posY = Math.min(this.posY, HEIGHT - this.radius);
      this.posY = Math.max(this.posY, 0);
      this.vy *= this.bounce;
    }
  },
  update() {
    this.blender();
    if (this.canMove) {
      this.posX += this.vx;
      this.posY += this.vy;
      this.collide();
      this.vy += this.gravity;
    }
  }
}