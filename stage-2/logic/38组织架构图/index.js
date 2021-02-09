class Tile {
    static WIDTH = 50
    static HEIGHT = 50
    static PADDIGN_X = 20
    static PADDIGN_Y = 10
    constructor(scene, id, posX, posY, value) {
        this.scene = scene
        this.posX = posX
        this.posY = posY
        this.id = id
        this.prev = null
        this.next = null
        this.value = value
        this.color = `#${Math.random().toString(16).substr(3, 6)}`
    }
    render() {
        let { WIDTH: w, HEIGHT: h, PADDIGN_X: x, PADDIGN_Y: y } = Tile
        let { ctx } = this.scene
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX, this.posY, w, h)
        ctx.fillStyle = '#fff'
        ctx.font = "20px Georgia"
        ctx.fillText(this.value, this.posX + 15, this.posY + 25)
    }
    update() {
        this.render()
    }
}

class Line {
    constructor(scene, parent, child, mode = 'x') {
        this.scene = scene
        this.parent = parent
        this.child = child
        this.mode = mode
    }
    render() {
        let { WIDTH: w, HEIGHT: h, PADDIGN_X: px, PADDIGN_Y: py } = Tile
        let { posX: sx, posY: sy } = this.parent
        let { posX: ex, posY: ey } = this.child
        let { ctx } = this.scene
        ctx.beginPath()
        if (this.mode === 'x') {
            ctx.moveTo(sx + w, sy + h / 2)
            ctx.lineTo(ex - px / 2, sy + h / 2)
            ctx.lineTo(ex - px / 2, ey + h / 2)
            ctx.lineTo(ex, ey + h / 2)
        } else {
            ctx.moveTo(sx + w / 2, sy + h)
            ctx.lineTo(sx + w / 2, ey - py / 2)
            ctx.lineTo(ex + w / 2, ey - py / 2)
            ctx.lineTo(ex + w / 2, ey)
        }
        ctx.stroke()
        ctx.closePath()
    }
    update() {
        this.render()
    }
}

class Scene {
    static WIDTH = 500
    static HEIGHT = 500
    constructor(ctx, data, mode = 'x') {
        this.data = data
        this.mode = mode
        this.ctx = ctx
        this.init()
    }
    init() {
        this.tiles = []
        this.lines = []
        this.markX = 0
        this.markY = 0
        this.tree = this.buildTree(this.data)
        this.calcTree(this.tree)
        this.calcLocation()
        this.getList()
        this.update()
    }
    createMap(data) {
        return data.reduce((s, k) => {
            s[k.id] = k
            return s
        }, {})
    }
    // isExist(node) {
    //     return this.tiles.some(tile => tile.id === node.id)
    // }
    calcLocation() {
        let root = this.tree
        // root.left = 0
        // root.top = 0
        let minOffset = 0
        const stack = [this.tree]
        while (stack.length) {
            const node = stack.shift()
            stack.push(...node.children)
            // const len = node.children.length
            // const offset = width * (len - 1) / 2
            node.children.forEach((item, index) => {
                const posX = node.posX - item.posX
                item.list ? item.list.push(posX) : (item.list = [posX])
                // item.posX = this.calcAvg(item.list)
                // item.top = node.top + height
                // minOffset = Math.min(item.left, minOffset)
            })
        }
        return { root, minOffset }
    }
    getList() {
        // const { root, minOffset } = this.calcLocation()
        const stack = [this.tree]
        while (stack.length) {
            const node = stack.shift()
            const last = this.tiles[this.tiles.length - 1]
            if (last && last.id === node.id) {
                continue
            }
            node.children.forEach((child) => {
                this.lines.push(new Line(this, node, child, this.mode))
            })
            this.tiles.push(new Tile(this, node.id, node.posX, node.posY, node.value))
            stack.push(...node.children)
        }
    }
    buildTree(data) {
        const rootId = data[0].id
        const map = this.createMap(data)
        data.forEach(e => {
            const item = map[e.id]
            item.children = []
            item.nextIds.forEach(id => {
                item.children.push(map[id])
            })
        })
        return map[rootId]
    }
    calcTree(data) {
        this.mode === 'x'
            ? this.calcTreeX(data)
            : this.calcTreeY(data)
    }
    calcAvg(list) {
        return list.reduce((s, v) => s += v) / list.length
    }
    calcTreeY(node, max = 0, par = null) {
        let children = node.children
        if (children && children.length) {
            this.markY++

            // 操作子节点
            let X = children.reduce((r, e) => {
                r += this.calcTreeY(e, max, node)
                return r
            }, max)

            // 操作根节点
            this.markY--
            // node.list ? node.list.push(par.posX) : (node.list = [par.posX])
            node.posX = X / children.length

            node.posY = (Tile.HEIGHT + Tile.PADDIGN_Y) * this.markY

            // core
            return node.posX
        }
        // 操作根节点
        node.posX = (Tile.WIDTH + Tile.PADDIGN_X) * this.markX
        node.posY = (Tile.HEIGHT + Tile.PADDIGN_Y) * this.markY
        // core
        this.markX++
        return node.posX
    }
    calcTreeX(node, max = 0, par = null) {
        let children = node.children
        if (children && children.length) {
            this.markX++

            // 操作子节点
            let Y = children.reduce((r, e) => {
                r += this.calcTreeX(e, max, node)
                return r
            }, max)

            // 操作根节点
            this.markX--
            node.posX = (Tile.WIDTH + Tile.PADDIGN_X) * this.markX
            node.posY = Y / children.length

            // core
            this.tiles.push(new Tile(this, node.id, node.posX, node.posY, node.value))
            par && this.lines.push(new Line(this, par, node, this.mode))
            return node.posY
        }
        // 操作根节点
        node.posX = (Tile.WIDTH + Tile.PADDIGN_X) * this.markX
        node.posY = (Tile.HEIGHT + Tile.PADDIGN_Y) * this.markY

        // core
        this.lines.push(new Line(this, par, node, this.mode))
        this.tiles.push(new Tile(this, node.id, node.posX, node.posY, node.value))
        this.markY++
        return node.posY
    }
    update() {
        let { WIDTH: w, HEIGHT: h } = Scene
        this.ctx.clearRect(0, 0, w, h)
        this.tiles.forEach(e => e.update())
        this.lines.forEach(e => e.update())
        // requestAnimationFrame(this.update.bind(this))
    }
}