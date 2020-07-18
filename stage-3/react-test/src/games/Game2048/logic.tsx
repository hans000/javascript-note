enum Directions {
    left = 37,
    up = 38,
    right = 39,
    down = 40,
}
type State = 'normal' | 'finished' | 'fail'

export default class Core2048 {
    public static Scale = 4
    public static MaxValue = 2048
    private score = 0
    private state: State = 'normal'
    private map: number[] = []
    private mapHandle = [
        { valid: this.upValid, delta: Core2048.Scale * -1 },
        { valid: this.rightValid, delta: 1 },
        { valid: this.downValid, delta: Core2048.Scale },
        { valid: this.leftValid, delta: -1 },
    ]
    private mapTransform = {
        [Directions.left]: this.leftTransform,
        [Directions.up]: this.upTransform,
        [Directions.right]: this.rightTransform,
        [Directions.down]: this.downTransform,
    }
    private mapReTransform = {
        [Directions.left]: this.leftTransform,
        [Directions.up]: this.upTransform,
        [Directions.right]: this.rightTransform,
        [Directions.down]: this.reDownTransform,
    }

    constructor() {
        this.initMap()
        this.fileTiles(2)
    }
    public reset() {
        this.state = 'normal'
        this.score = 0
        this.initMap()
    }
    public getScore() {
        return this.score
    }
    public getState() {
        return this.state
    }
    public getMap() {
        return [...this.map]
    }
    public move(dir: Directions) {
        const result: number[] = []
        // 转换、合并
        this.merge(this.transform(this.mapTransform[dir])).forEach(line => {
            result.push(...this.mergeLine(line))
        })
        // 逆转换
        const newData = this.transform(this.mapReTransform[dir], result)
        // 更新状态
        if (newData.toString() !== this.map.toString()) {
            this.map = newData
            this.fileTiles()
            this.updateState()
        }
    }

    private updateState() {
        if (this.map.some(v => v === Core2048.MaxValue)) {
            this.state = 'finished'
        } else if (!this.getBlankTiles().length && this.canMerge()) {
            this.state = 'fail'
        }
    }
    private upValid(index: number) {
        return index - Core2048.Scale >= 0
    }
    private rightValid(index: number) {
        return index % Core2048.Scale !== Core2048.Scale - 1
    }
    private downValid(index: number) {
        return index + Core2048.Scale < Core2048.Scale ** 2
    }
    private leftValid(index: number) {
        return index - 1 >= 0 && index % Core2048.Scale !== 0
    }
    private canMerge() {
        return this.map.some((v, i) => {
            return this.mapHandle.some(({ valid, delta }) => {
                return valid(i) && this.map[i + delta] === v
            })
        })
    }
    private mergeLine(line: number[]) {
        const scale = Core2048.Scale
        const stack: number[] = []
        for (let i = 0; i < scale; i++) {
            const prev = line[i]
            if (prev === 0) {
                continue;
            }
            let j = i + 1
            let next = null
            for (; j < scale; j++) {
                next = line[j]
                if (next) {
                    break
                }
            }
            if (prev === next) {
                const result = prev * 2
                this.score += result
                stack.push(result)
                i = j
            } else {
                stack.push(prev)
            }
        }
        const reuslt = Array.from({ length: scale }, (v, k) => stack[k] ? stack[k] : 0)
        return reuslt
    }
    private merge(map: number[]) {
        const scale = Core2048.Scale
        const lines: number[][] = []
        for (let i = 0; i < scale; i++) {
            lines.push(map.splice(0, scale))
        }
        return lines
    }
    private leftTransform(data: number[], i: number, j: number) {
        const scale = Core2048.Scale
        return data[i * scale + j]
    }
    private upTransform(data: number[], i: number, j: number) {
        const scale = Core2048.Scale
        return data[j * scale + i]
    }
    private rightTransform(data: number[], i: number, j: number) {
        const scale = Core2048.Scale
        return data[i * scale + (scale - j - 1)]
    }
    private downTransform(data: number[], i: number, j: number) {
        const scale = Core2048.Scale
        return data[(scale - j - 1) * scale + i]
    }
    private reDownTransform(data: number[], i: number, j: number) {
        const scale = Core2048.Scale
        return data[(j + 1) * scale - 1 - i]
    }
    private transform(handle: Function, data = this.map) {
        const scale = Core2048.Scale
        const arr: number[] = []
        for (let i = 0; i < scale; i++) {
            for (let j = 0; j < scale; j++) {
                arr.push(handle(data, i, j))
            }
        }
        return arr
    }
    private fileTiles(count = 1) {
        const blankTilesBySort = this.getBlankTiles().sort(() => Math.random() - .5)
        blankTilesBySort.splice(0, count).forEach(index => {
            this.map[index] = this.createRndNum()
        })
    }
    private getBlankTiles() {
        return this.map.reduce<number[]>((r, e, i) => {
            if (!e) {
                r.push(i)
            }
            return r
        }, [])
    }
    private createRndNum() {
        return Math.random() > 0.5 ? 2 : 4
    }
    private initMap() {
        this.map = Array.from({ length: Core2048.Scale ** 2 }, () => 0)
    }
}