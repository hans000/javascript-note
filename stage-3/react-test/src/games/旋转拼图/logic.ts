export const ROW = 6 // 色块行数，同时也是列数
export const G_WIDTH = 360 //容器宽度，
export const WIDTH_DOT = 28 // 旋钮大小
export const ROW_DOT = ROW - 1 // 旋钮行数

export function initDotList() {
    const row = ROW - 1
    return Array.from({ length: (row ** 2) }, (_ ,i) => {
        return (i / row | 0) * ROW + i % row
    })
}

const total = ROW ** 2

export function getRandNum(max: number) {
    return Math.random() * max | 0
}

export function initData() {
    return Array.from({ length: total }, (_, i) => {
        const row = (i / ROW | 0) >= ROW / 2 ? 1 : 0
        const col = i % ROW >= ROW / 2 ? 1 : 0
        return row * 2 + col
    })
}

export function turn(sourceData: number[], index: number) {
    const data = [...sourceData]
    const offset = [[0, 0], [0, 1], [1, 1], [1, 0]]
    for (let i = 0; i < offset.length; i++) {
        const [y1, x1] = offset[i]
        const [y2, x2] = offset[(i + 1) % 4]
        const prev = index + y1 * ROW + x1
        const next = index + y2 * ROW + x2
        data[next] = sourceData[prev]
    }
    return data
}