
const list = [
    { id: '1', nextId: '2' },
    { id: '2', nextId: '3' },
    { id: '3', nextId: '4' },
    { id: '4', nextId: '5' },
    { id: '5', nextId: '6' },
    { id: '6', nextId: null },
    // { id: '6', nextId: '1' },
]


function toTree(list) {
    const result = []
    const map = list.reduce((acc, item) => (acc[item.id] = item, acc), {})
    list.forEach(item => {
        const parent = map[item.nextId]
        if (parent) {
            const children = parent.children || (parent.children = [])
            children.push(item)
        } else {
            result.push(item)
        }
    })
    return result
}