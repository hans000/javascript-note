function Chunk(data) {
  this.num = 0;
  this.pre = 0;
  this.posX = data.posX;
  this.posY = data.posY;
  this.ctx = data.ctx;
  this.max = 60;
  this.balls = [];
  this.tiles = [];
  this.round = null;
}
Chunk.prototype = {
  init() {
    this.format(this.num).forEach((e, i) => {
      let tile = new Tile({ num: +e, ctx: this.ctx });
      tile.posX = 1.2 * i * tile.rate * tile.radius * tile.col + this.posX;
      tile.posY = this.posY;
      tile.init();
      this.tiles[i] = tile;
    })
    return this;
  },
  format(num) {
    return Array.from(`00${num}`.slice(-2));
  },
  update() {
    this.format(this.num % this.max).forEach((e, i) => {
      if (this.format(this.pre)[i] != e) {
        let tile = new Tile({ num: +e, ctx: this.ctx, });
        this.tiles[i].balls.forEach(el => {
          el.canMove = true;
          el.light = true;
          el.birth = new Date();
          this.balls.push(el);
        })
        tile.posX = 1.2 * i * tile.rate * tile.radius * tile.col + this.posX;
        tile.posY = this.posY;
        tile.init();
        this.tiles[i] = tile;
      } else {
        this.tiles[i].update();
      }
    })
    this.pre = this.num;
    if (this.max === this.num) {
      this.round && this.round()
      this.num %= this.max;
    }
  },
}