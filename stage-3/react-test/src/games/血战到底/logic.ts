const ROW = 8 // 行数，同时也是列数
const G_WIDTH = 480 //容器宽度，

const total = ROW ** 2
const MAX_NUMBER = 100

function getRandNum(max: number, min = 0) {
    return min + Math.random() * max | 0
}

function canVerticalLink(data: number[], p1: number, p2: number) {
    const [y1, x1] = convert(p1);
    const [y2, x2] = convert(p1);
    if (x1 !== x2) {
        return false
    }
    const [yMin, yMax] = y1 <= y2 ? [y1, y2] : [y2, y1]
    for (let i = yMin + 1; i < yMax - 1; i++) {
        if (data[x1 + ROW * i]) {
            return false
        }
    }
    return true
}
function canHorizonLinK(data: number[], p1: number, p2: number) {
    const [y1, x1] = convert(p1);
    const [y2, x2] = convert(p1);
    if (y1 !== y2) {
        return false
    }
    const [xMin, xMax] = x1 <= x2 ? [x1, x2] : [x2, x1]
    for (let i = xMin + 1; i < xMax - 1; i++) {
        if (data[y1 * ROW + i]) {
            return false
        }
    }
    return true
}

function initData() {
    const data = Array.from({ length: total }, (_, i) => i)
    const num = getRandNum(MAX_NUMBER, 1)
    
    return [0]
}
function convert(index: number) {
    return [index / ROW | 0, index % ROW]
}
function canSweep(sourceData: number[], prev: number, next: number) {
    const [r1, c1] = convert(prev)
    const [r2, c2] = convert(next)
    const [minCol, maxCol] = c1 <= c2 ? [c1, c2] : [c2, c1]
    const [minRow, maxRow] = r1 <= r2 ? [r1, r2] : [r2, r1]

    // horizontal
    for (let i = minCol + 1; i < maxCol; i++) {
        if (!canHorizonLinK(sourceData, prev, ROW * r1 + i)) {
            continue
        }
        if (!canHorizonLinK(sourceData, ROW * r2 + i, next)) {
            continue
        }
        if (!canVerticalLink(sourceData, ROW * minRow + i, ROW * maxRow + i)) {
            continue
        }
        return true
    }
    // vertical
    for (let i = minRow + 1; i < maxRow; i++) {
        if (!canVerticalLink(sourceData, prev, ROW * r1 + i)) {
            continue
        }
        if (!canVerticalLink(sourceData, ROW * r2 + i, next)) {
            continue
        }
        if (!canHorizonLinK(sourceData, ROW * minRow + i, ROW * maxRow + i)) {
            continue
        }
        return true
    }
    return false
}

function sweep(sourceData: number[], prev: number, next: number) {
    
}

const data = [
    0, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 2, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 0, 0, 0,
]

console.log(canSweep(data, 1, 27));

export default {}