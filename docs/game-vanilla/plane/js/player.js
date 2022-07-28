class Player extends Sprite {
    constructor(...args) {
        super(...args)
        this.scene = scene
        this.rotate = 0
        this.init()
    }
    init() {
        this.actions = {}
        this.keydowns = {}
        this.registerActions('a', this.moveLeft)
        this.registerActions('w', this.moveUp)
        this.registerActions('s', this.moveDown)
        this.registerActions('d', this.moveRight)
        this.bindEvent()
    }
    registerActions(key, fn) {
        this.actions[key] = fn.bind(this)
    }
    bindEvent() {
        window.addEventListener('keydown', e => {
            this.keydowns[e.key] = true
        })
        window.addEventListener('keyup', e => {
            this.keydowns[e.key] = false
        })
    }
    moveLeft() {
        this.posX -= this.vx
    }
    moveRight() {
        this.posX += this.vx
    }
    moveUp() {
        this.posY -= this.vy
    }
    moveDown() {
        this.posY += this.vy
    }
    collide() {
        if (this.posX + this.getLength() > this.scene.innerWidth ||
            this.posX - this.getLength() < 0) {
        }
        if (this.posY + this.getLength() > this.scene.innerHeight ||
            this.posY - this.getLength() < 0) {
        }
    }
    blender() {
        // ctx.save()
        ctx.fillStyle = '#369'
        // ctx.translate(this.posX, this.posY)
        // ctx.rotate(this.rotate * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(this.posX - this.scene.offsetX, this.posY - this.getLength() - this.scene.offsetY)
        ctx.lineTo(this.posX - this.scene.offsetX + this.getLength() / 2, this.posY + this.getLength() - this.scene.offsetY)
        ctx.lineTo(this.posX - this.scene.offsetX, this.posY + this.getLength() / 5 - this.scene.offsetY)
        ctx.lineTo(this.posX - this.scene.offsetX - this.getLength() / 2, this.posY + this.getLength() - this.scene.offsetY)
        ctx.closePath()
        ctx.fill()
        // ctx.restore()
        // ctx.fillStyle = this.color
        // ctx.beginPath()
        // ctx.fillRect(this.posX + this.scene.offsetX, this.posY + this.scene.offsetY, this.getLength(), this.getLength())
        // ctx.fill()
    }
    update() {
        this.rotate++
        this.collide()
        this.blender()
        for (const k in this.keydowns) {
            this.keydowns[k] && this.actions[k] && this.actions[k]()
        }
    }
}
