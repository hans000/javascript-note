const ROW = 8 // 行数，同时也是列数
const G_WIDTH = 480 //容器宽度，

const total = ROW ** 2
const MAX_NUMBER = 100

function getRandNum(max: number, min = 0) {
    return min + Math.random() * max | 0
}

function canVerticalLink(data: number[], p1: number, p2: number) {
    const [y1, x1] = convert(p1);
    const [y2, x2] = convert(p2);
    if (x1 !== x2) {
        return false
    }
    const [yMin, yMax] = y1 <= y2 ? [y1, y2] : [y2, y1]
    for (let i = yMin + 1; i < yMax; i++) {
        if (data[x1 + ROW * i]) {
            return false
        }
    }
    return true
}
function canHorizonLinK(data: number[], p1: number, p2: number) {
    const [y1, x1] = convert(p1);
    const [y2, x2] = convert(p2);
    if (y1 !== y2) {
        return false
    }
    const [xMin, xMax] = x1 <= x2 ? [x1, x2] : [x2, x1]
    for (let i = xMin + 1; i < xMax; i++) {
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
    for (let i = 0; i < ROW; i++) {
        const p1 = ROW * r1 + i
        if (prev !== p1 && sourceData[p1]) {
            continue
        }
        if (!canHorizonLinK(sourceData, prev, ROW * r1 + i)) {
            continue
        }
        const p2 = ROW * r2 + i
        if (next !== p2 && sourceData[p2]) {
            continue
        }
        if (!canHorizonLinK(sourceData, p2, next)) {
            continue
        }
        if (i === 0 || i === ROW - 1) {
            return true
        }
        if (!canVerticalLink(sourceData, p1, p2)) {
            continue
        }
        return true
    }
    // vertical
    for (let i = 0; i < ROW; i++) {
        const p1 = ROW * i + c1
        if (prev !== p1 && sourceData[p1]) {
            continue
        }
        if (!canVerticalLink(sourceData, prev, p1)) {
            continue
        }
        const p2 = ROW * i + c2
        if (next !== p2 && sourceData[p2]) {
            continue
        }
        if (!canVerticalLink(sourceData, p2, next)) {
            continue
        }
        if (i === 0 || i === ROW - 1) {
            return true
        }
        if (!canHorizonLinK(sourceData, p1, p2)) {
            continue
        }
        return true
    }
    return false
}

function sweep(sourceData: number[], prev: number, next: number) {
    
}

const data = [
    0, 9, 1, 1, 0, 0, 0, 0, // 7
    0, 0, 1, 0, 0, 0, 0, 0, // 15
    0, 0, 1, 9, 0, 0, 0, 0, // 23
    0, 0, 1, 0, 0, 0, 0, 0, // 31
    0, 0, 1, 0, 0, 0, 0, 0, // 39
    0, 0, 1, 0, 0, 0, 0, 0, // 47
    0, 0, 0, 0, 0, 0, 0, 0, // 55
    0, 0, 1, 1, 0, 0, 0, 0,
]

console.log(canSweep(data, 1, 19));
// console.log(canVerticalLink(data, 1, 17));

export default {}