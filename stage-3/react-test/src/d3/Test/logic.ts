
export function createPolyonPoints(posX: number, posY: number, count: number, r: number) {
    const angle = 90
    let per = 360 / count
    const points = []
    for (let i = 0; i < count; i++) {
        let x = Util.cos(angle + i * per + 180) * r + posX
        let y = Util.sin(angle + i * per + 180) * r + posY
        points.push({ x, y })
    }
    return points
}
export function getAreaIndex(angle: number) {
    const num = angle / Math.PI * 6
    if (num > -5 && num <= -3) { return 5 }
    if (num > -3 && num <= -1) { return 0 }
    if (num > -1 && num <= 1) { return 1 }
    if (num > 1 && num <= 3) { return 2 }
    if (num > 3 && num <= 5) { return 3 }
    return 4
}

interface PointType {
    x: number
    y: number
}

class Line {
    public static dir = true
    private value = false;
    public isVisited = false;
    private p1: PointType
    private p2: PointType
    private svg: any

    constructor(p1: PointType, p2: PointType) {
        this.p1 = p1
        this.p2 = p2
    }
    public getPoints() {
        return [this.p1, this.p2]
    }
    public toggle() {
        this.value = !this.value
        this.svg.setAttribute('stroke', this.value ? 'blue' : 'pink')
    }
    public setSvg(svg: any) {
        this.svg = svg
    }
    public getValue() { return this.value }
}

class Util {
    static sin(angle: number) {
        return Math.sin(angle * Math.PI / 180)
    }
    static cos(angle: number) {
        return Math.cos(angle * Math.PI / 180)
    }
}
class Hexagon {
    public static vector = [[1, -1], [1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1]]
    private x: number
    private y: number
    private lines: Line[] = []
    private context: HexagonPeakTurn
    private points: PointType[] = []

    constructor(x: number, y: number, context: HexagonPeakTurn) {
        this.x = x
        this.y = y
        this.context = context
        this.init()
    }
    private init() {
        this.points = createPolyonPoints(this.x, this.y, 6, HexagonPeakTurn.radius)
        for (let i = 0, len = this.points.length; i < len; i++) {
            const p1 = this.points[i];
            const p2 = (i + 1) % len === 0 ? this.points[0] : this.points[i + 1]
            this.lines.push(new Line(p1, p2))
        }
    }
    public getPoints() { return this.points }
    public getX() { return this.x }
    public getY() { return this.y }
    public getLines() { return this.lines }
    public getLocation() {
        const r = HexagonPeakTurn.radius + 1.7
        const ir = HexagonPeakTurn.innerRadius - .5
        const ox = HexagonPeakTurn.offsetX
        const oy = HexagonPeakTurn.offsetY
        const x = (this.x + this.y / 2) * 2 * ir + ox
        const y = this.y * ((ir + .5) / 2 + r) + oy
        return [x, y]
    }
    public toggle(index: number) {
        this.lines[index].toggle()
        const [dx, dy] = Hexagon.vector[index]
        const one = this.context.find(this.x + dx, this.y + dy)
        one?.lines[(index + 3) % 6].toggle()
    }
}

export class HexagonPeakTurn {
    public static scale = 3
    public static offsetX = 300
    public static offsetY = 300
    public static radius = 36
    public static innerRadius = HexagonPeakTurn.radius * Math.pow(3, .5) / 2
    private list: Hexagon[] = []

    constructor() {
        this.init()
    }
    public find(x: number, y: number) {
        return this.list.find(item => item.getX() === x && item.getY() === y)
    }
    private init() {
        this.createMap()
    }
    private createMap() {
        const scale = HexagonPeakTurn.scale
        for (let x = -scale; x <= scale; x++) {
            let y = Math.max(-scale - x, -scale)
            const k = Math.min(scale - x, scale)
            for (; y <= k; y++) {
                this.list.push(new Hexagon(x, y, this))
            }
        }
    }
    public getList() { return this.list }
}

