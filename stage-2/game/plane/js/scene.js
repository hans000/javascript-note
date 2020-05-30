class Scene {
    constructor(data) {
        this.actors = []
        this.innerWidth = data.innerWidth || 0
        this.innerHeight = data.innerHeight || 0
        this.player = null
    }
    init() {
        this.GWidth = 700
        this.GHeight = 500
        this.startX = 300
        this.startY = 200
        this.update()
    }
    blender() {
        this.offsetX = this.player.posX - this.startX
        this.offsetY = this.player.posY - this.startY
        if (this.offsetX < 0 || this.offsetX > this.GWidth - this.startX * 2) {
            this.offsetX = Math.max(0, Math.min(this.offsetX, this.GWidth - this.startX * 2))
        }
        if (this.offsetY < 0 || this.offsetY > this.GHeight - this.startY * 2) {
            this.offsetY = Math.max(0, Math.min(this.offsetY, this.GHeight - this.startY * 2))
        }
        let size = 100
        for (let i = 0; i < this.GWidth / size; i++) {
            for (let j = 0; j < this.GHeight / size; j++) {
                let ox = i*size - this.offsetX
                let oy = j*size - this.offsetY
                if ((i + j) % 2) {
                    ctx.fillStyle = '#eee'
                    ctx.fillRect(ox, oy, size, size)
                }
                ctx.fillStyle = '#aaa'
                ctx.font="10px Arial"
                ctx.fillText(`(${i}, ${j})`, ox, oy + 10)
            }
        }
    }
    update() {
        ctx.clearRect(0, 0, this.innerWidth, this.innerHeight)
        this.blender()
        this.actors.forEach(e => e.update())
        this.player.update()
        requestAnimationFrame(this.update.bind(this))
    }
}