class Node {
    constructor(value) {
        this.value = value
        this.factor = 0
        this.left = null
        this.right = null
    }
}

class AvlTree {
    constructor() {
        this.data = [null]
    }
    getFactor(index) {
        const left = this.data[index * 2]
        const lh = left ? left.factor : -1
        const right = this.data[index * 2 + 1]
        const rh = right ? right.factor : -1
        return Math.abs(lh - rh)
    }
    getChildPosition(index) {
        const parent = this.data[index]
        if (! parent) {
            return null
        }
        index *= 2
        return  this.data[index] ? index : index + 1
    }
    add(val) {
        let i = 1
        while (this.data[i]) {
            i = this.data[i].value > val
                ? i * 2
                : i * 2 + 1
        }

        this.data[i] = new Node(val)
        while (true) {
            i = i / 2 | 0
            if (i === 0) break
            const factor = this.getFactor(i)
            if (factor === 2) {
                // 调整
                const childIndex = this.getChildPosition(i)
                const child = this.data[childIndex]
                const subchildIndex = this.getChildPosition(childIndex)
                const subchild = this.data[subchildIndex]

                this.data[subchildIndex] = null
                if (child.value > subchild.value) {
                    this.data[i * 2 + 1] = this.data[i]
                    this.data[i] = child
                    this.data[childIndex] = subchild
                } else {
                    this.data[i * 2 + 1] = this.data[i]
                    this.data[i] = subchild
                    this.data[childIndex] = child
                }
            }
            this.data[i].factor = factor
        }
        
    }
}

const avl = new AvlTree()
const data = [30, 12, 5, 34, 9, 1]
data.forEach((e) => avl.add(e))
console.log(avl.data);