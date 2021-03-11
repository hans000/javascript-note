

/**
 * 大顶堆
 */
class Heap {
    constructor() {
        this.size = 0
        this.data = [Infinity]
    }
    isEmpty() {
        return this.size === 0
    }
    /**
     * 插入一个元素，插入末尾，然后上浮
     */
    insert(elt) {
        let i = ++this.size
        while (elt > this.data[i / 2 | 0]) {
            this.data[i] = this.data[i / 2 | 0]
            i = i / 2 | 0
        }
        this.data[i] = elt
    }
    /**
     * 删除根元素，末尾替补根元素，按堆规范整理数据
     */
    delete() {
        if (this.isEmpty()) {
            return
        }
        const rootElt = this.data[1]
        const tmpElt = this.data.splice(this.size, 1)[0]
        this.size--
        let parent = 0, child = 0
        for (parent = 1; parent * 2 <= this.size; parent = child) {
            child = 2 * parent
            // 有右节点且右节点大时
            if (child !== this.size && this.data[child] < this.data[child + 1]) {
                child++
            }
            if (tmpElt >= this.data[child]) {
                break
            }
            this.data[parent] = this.data[child]
        }
        this.data[parent] = tmpElt
        return rootElt
    }
}

const inst = new Heap()
inst.insert(5)
inst.insert(1)
inst.insert(6)
inst.insert(4)
inst.insert(2)
inst.insert(3)
inst.insert(10)
console.log(inst.data)