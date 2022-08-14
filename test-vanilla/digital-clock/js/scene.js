function Scene(data) {
  this.ctx = data.ctx;
  this.HEIGHT = data.HEIGHT;
  this.WIDTH = data.WIDTH;
  this.chunks = [];
  this.count = 0;
}
Scene.prototype = {
  init() {
    this.chunks.push(new Chunk({ posX: 100, posY: 100, ctx }).init())  // hour
    this.chunks.push(new Chunk({ posX: 300, posY: 100, ctx }).init())  // min
    this.chunks.push(new Chunk({ posX: 500, posY: 100, max: 24, ctx }).init())  //second
    this.update();
    return this;
  },
  getTime() {
    let d = new Date()
    return {
      sec: d.getSeconds(),
      min: d.getMinutes(),
      hour: d.getHours(),
    }
  },
  updateTime() {
    let { sec, min, hour } = this.getTime();
    this.chunks[0].num = hour;
    this.chunks[1].num = min;
    this.chunks[2].num = sec;
  },
  update() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx.fillText(`当前小球数量${this.count}`, 10, 30);
    this.ctx.fillText(`绚丽的数字时钟，By hans`, this.WIDTH - 250, 30);
    this.count = 0;
    this.updateTime();
    this.chunks.forEach(e => {
      e.update();
      this.count += e.balls.length;
      for (let i = e.balls.length - 1; i >= 0; i--) {
        if (!e.balls[i].alive) {
          e.balls.splice(i, 1);
          continue;
        }
        e.balls[i].update();
      }
    })
    requestAnimationFrame(this.update.bind(this));
  },
}