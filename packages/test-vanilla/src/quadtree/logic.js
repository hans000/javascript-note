class Circle {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
    getRect() {
        return {
            left: this.x - this.r,
            top: this.y - this.r,
            right: this.x + this.r,
            bottom: this.y + this.r,
        }
    }
}
class QuadNode {
    constructor(options) {
        const { deepth, tag, ...rect } = options
        this.data = null
        this.rect = rect
        this.children = []
        this.tag = tag || 'root'
        this.deepth = deepth || 0
    }
    isCoincide(params) {
        return (
            this.rect.top < params.top &&
            this.rect.bottom > params.top &&
            this.rect.left < params.left &&
            this.rect.right > params.left ||
            this.rect.top < params.bottom &&
            this.rect.bottom > params.bottom &&
            this.rect.left < params.right &&
            this.rect.right > params.right
        )
    }
    add(item) {
        this.build(this, item)
    }
    build(node, item) {
        if (node.children.length) {
            node.children.forEach(c => this.build(c, item))
        } else if (node.isCoincide(item.getRect())) {
            if (node.data == null) {
                node.data = item
            } else {
                node.children = node.initChildren()
                const data = node.data
                node.data = null
                node.children.forEach(c => c.add(data)) // 把父节点的数据先分配
                node.children.forEach(c => c.add(item)) // 把新数据分配
            }
        }
    }
    initChildren() {
        const { left, top, bottom, right } = this.rect
        const midX = (left + right) / 2
        const midY = (top + bottom) / 2
        const deepth = this.deepth + 1
        const ul = new QuadNode({ left, top, right: midX, bottom: midY, deepth, tag: 'ul' })
        const ur = new QuadNode({ left: midX, top: 0, right, bottom: midY, deepth, tag: 'ur' })
        const bl = new QuadNode({ left, top: midY, right: midX, bottom, deepth, tag: 'bl' })
        const br = new QuadNode({ left: midX, top: midY, right, bottom, deepth, tag: 'br' })
        return [ul, ur, bl, br]
    }
    render(ctx) {
        if (this.children.length) {
            this.children.forEach(c => c.render(ctx))
        } else {
            const { left, top, bottom, right } = this.rect
            ctx.beginPath()
            ctx.rect(left, top, right - left, bottom - top)
            ctx.stroke()
            ctx.closePath()
        }
    }
}
