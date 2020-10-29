function filterLastChildrenProp(tree) {
    omit(tree)

    function omit(tree) {
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children && node.children.length) {
                omit(node.children)
            } else {
                delete node.children
            }
        }
    }
}


class ExcelHeader {
    constructor() {
        this.store = []
    }
    add(level, node, parent) {
        this.store[level]
            ? this.store[level][node] = parent
            : this.store[level] = { [node]: parent }
    }
    get() {
        return this.store
    }
}
function toArray(tree) {
    const list = []
    build(tree)
    function build(tree, deepth = 0, left = 0) {
        let sumWidth = 0
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            let width = 1
            if (node.children.length) {
                width = build(node.children, deepth + 1, left)
            }
            if (!left) {
                list[deepth] = []
            }
            list[deepth].push(...Array.from({ length: width }, () => node.title))
            left += width
            sumWidth += width
        }
        return sumWidth
    }
    return list
}

function init(tree) {
    const list = []
    build(tree)
    function build(tree, parentTitle, top = 0, left = 0) {
        let sumWidth = 0
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i]
            let width = 1, height = 1
            if (node.children.length) {
                const result = build(node.children, node.title, top + 1, left)
                if (result.canMerge) {
                    height += result.height
                }
                width = result.width
            }
            // 向右合并
            if (i < tree.length - 1 && node.title === tree[i + 1].title) {
                width++
                continue
            }
            // 向上合并
            if (node.title === parentTitle) {
                if (tree.length > 1) {
                    throw new Error('该节点和父级名称重复')
                }
                return {
                    canMerge: true,
                    width,
                    height
                }
            }
            list.push({
                top,
                left,
                width,
                height,
                title: node.title,
            })
            left += width
            sumWidth += width
        }
        return {
            canMerge: false,
            width: sumWidth,
        }
    }
    return list
}