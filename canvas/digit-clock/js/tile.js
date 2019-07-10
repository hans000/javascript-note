function Tile(data) {
  this.posX = data.posX || 100;
  this.posY = data.posY || 100;
  this.num = data.num || 0;
  this.radius = data.radius || 10;
  this.ctx = data.ctx;
  this._frame = [0x7b6f, 0x2c97, 0x73e7, 0x73cf, 0x5bc9, 0x79cf, 0x79ef, 0x7292, 0x7bef, 0x7bcf];
  this.balls = [];
  this.rate = 2.2;
  this.row = 5;
  this.col = 3;
}
Tile.prototype = {
  init() {
    this.create();
    return this;
  },
  create() {
    let num = this._frame[this.num];
    let ctx = this.ctx;
    let col = this.col, row = this.row - 1;
    while (num) {
      let show = num & 1;
      num = num >> 1;
      if (!col--) {
        col = this.col - 1;
        row--;
      }
      if (show) {
        let posX = this.posX + col * this.radius * this.rate;
        let posY = this.posY + row * this.radius * this.rate;
        this.balls.push(new Ball({ posX, posY, }).init({ ctx, }));
      }
    }
  },
  update() {
    this.balls.forEach(e => {
      e.update();
    })
  }
}