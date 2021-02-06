
const foo = [
    { id: 'a', value: 'a', nextIds: ['b', 'c', 'd'] },
    { id: 'b', value: 'b', nextIds: ['e'] },
    { id: 'c', value: 'c', nextIds: ['e'] },
    { id: 'd', value: 'd', nextIds: ['f', 'g', 'gg'] },
    { id: 'e', value: 'e', nextIds: ['h'] },
    { id: 'f', value: 'f', nextIds: ['i'] },
    { id: 'g', value: 'g', nextIds: ['i'] },
    { id: 'gg', value: 'gg', nextIds: ['i'] },
    { id: 'h', value: 'h', nextIds: ['k'] },
    { id: 'i', value: 'i', nextIds: ['j'] },
    { id: 'j', value: 'j', nextIds: ['k'] },
    { id: 'k', value: 'k', nextIds: [] },
]

function createGraph(data) {
    const rootId = data[0].id
    const map = createMap(data)
    data.forEach(e => {
        const item = map[e.id]
        item.children = []
        item.nextIds.forEach(id => {
            item.children.push(map[id])
        })
    })
    return map[rootId]
}
function createMap(data) {
    return data.reduce((s, k) => {
        s[k.id] = k
        return s
    }, {})
}

const width = 100, height = 50

function calcLocation(graph) {
    let root = graph
    root.left = 0
    root.top = 0
    let minOffset = 0
    const stack = [graph]
    while (stack.length) {
        const node = stack.shift()
        stack.push(...node.children)
        const len = node.children.length
        const offset = width * (len - 1) / 2
        node.children.forEach((item, index) => {
            const left = node.left - offset + width * index
            item.list ? item.list.push(left) : (item.list = [left])
            item.left = calcAvg(item.list)
            item.top = node.top + height
            minOffset = Math.min(item.left, minOffset)
        })
    }
    return { root, minOffset }
}

function calcAvg(list) {
    return list.reduce((s, v) => s += v) / list.length
}

function getList() {
    const { root, minOffset } = calcLocation(createGraph(foo))
    const result = []
    const lines = []
    const stack = [root]
    while (stack.length) {
        const node = stack.shift()
        const last = result[result.length - 1]
        if (last && last.id === node.id) {
            continue
        }
        node.children.forEach(child => {
            lines.push({
                x1: child.left - minOffset,
                y1: child.top,
                x2: node.left - minOffset,
                y2: node.top
            })
        })
        result.push({
            left: node.left - minOffset,
            top: node.top,
            value: node.value,
            id: node.id,
            nextIds: node.nextIds,
        })
        stack.push(...node.children)
    }
    return [result, lines]
}