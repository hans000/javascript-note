class Sprite {
    constructor(data) {
        this.scene = data.scene
        this.posX = data.posX || 0
        this.posY = data.posY || 0
        this.vx = data.vx || 1
        this.vy = data.vy || 1
        this.dx = data.dx || 0.02
        this.dy = data.dy || 0.005
        this.ax = data.ax || 90
        this.ay = data.ay || 0
        this.color = data.color || '#369'
        this.unit = 10
        this.size = 1
        this.alive = true
    }
    getLength() {
        return this.size * this.unit
    }
    collide() {
        if (this.posX + this.getLength() > this.scene.innerWidth ||
            this.posX - this.getLength() < 0) {
        }
        if (this.posY + this.getLength() > this.scene.innerHeight ||
            this.posY - this.getLength() < 0) {
        }
    }
    motions() {
        
    }
    moveOne() {
        this.posX += this.sin(1);
        this.posY += 0.6
    }
    sin(delta=1, flag=false) {
        this.ax += delta
        let val = Math.sin(this.ax / 180 * 3.14)
        return flag ? Math.abs(val) : val
    }
    sport() {
        this.posX += Math.sin(this.ax / 180 * 3.14)
        this.ax += .3
        this.posY += this.vy
        this.vy += this.dy
    }
    blender() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.fillRect(this.posX - this.scene.offsetX, this.posY - this.scene.offsetY, this.getLength(), this.getLength())
        ctx.fill()
    }
    update() {
        // this.moveOne()
        this.collide()
        this.blender()
    }
}
