export type ModeType = 'horizontal' | 'vertical'

class Line {
    public static dir = true
    private mode: ModeType = 'horizontal';
    private value = false;
    public isVisited = false;
    private vGroup: LineGroup = null
    private hGroup: LineGroup = null
    private index: number = -1

    constructor(mode: ModeType, index: number, vGroup: LineGroup, hGroup: LineGroup) {
        this.mode = mode
        this.vGroup = vGroup
        this.hGroup = hGroup
        this.index = index
    }
    public toggle() {
        this.value = !this.value
    }
    public getValue() {
        return this.value
    }
    public getMode() {
        return this.mode
    }
    public next(): Line {
        const scale = PeakTurn.scale
        const index = this.index
        const max = scale * (scale + 1)
        if (this.mode === 'horizontal') {
            const row = index / scale | 0
            const col = index % scale

            if (Line.dir) {
                const rui = (row - 1) * (scale + 1) + col + 1
                if (rui >= 0) {
                    const ru = this.vGroup.getLine(rui)
                    if (ru.getValue() && !ru.isVisited) {
                        ru.isVisited = true
                        Line.dir = true
                        return ru
                    }
                }
                const ri = index + 1
                if (index % scale !== scale - 1) {
                    const r = this.hGroup.getLine(ri)
                    if (r.getValue() && !r.isVisited) {
                        r.isVisited = true
                        Line.dir = true
                        return r
                    }
                }
                const rdi = row * (scale + 1) + col + 1
                if (rdi < max) {
                    const rd = this.vGroup.getLine(rdi)
                    if (rd.getValue() && !rd.isVisited) {
                        rd.isVisited = true
                        Line.dir = false
                        return rd
                    }
                }
            } else {
                const ldi = row * (scale + 1) + col
                if (ldi < max) {
                    const ld = this.vGroup.getLine(ldi)
                    if (ld.getValue() && !ld.isVisited) {
                        ld.isVisited = true
                        Line.dir = false
                        return ld
                    }
                }
                const li = index - 1
                if (index % scale !== 0) {
                    const l = this.hGroup.getLine(li)
                    if (l.getValue() && !l.isVisited) {
                        l.isVisited = true
                        Line.dir = false
                        return l
                    }
                }
                const lui = (row - 1) * (scale + 1) + col
                if (lui >= 0) {
                    const lu = this.vGroup.getLine(lui)
                    if (lu.getValue() && !lu.isVisited) {
                        lu.isVisited = true
                        Line.dir = true
                        return lu
                    }
                }
            }
            
        } else {
            const row = index / (scale + 1) | 0
            const col = index % (scale + 1)
            if (Line.dir) {
                const lui = row * scale + col - 1
                if (lui >= 0) {
                    const lu = this.hGroup.getLine(lui)
                    if (lu.getValue() && lu.getValue() && !lu.isVisited) {
                        lu.isVisited = true
                        Line.dir = false
                        return lu
                    }
                }
                const ui = index - scale - 1
                if (ui >= 0) {
                    const u = this.vGroup.getLine(ui)
                    if (u.getValue() && u.getValue() && !u.isVisited) {
                        u.isVisited = true
                        Line.dir = true
                        return u
                    }
                }
                const rui = row * scale + col
                if (col !== scale) {
                    const ru = this.hGroup.getLine(rui)
                    if (ru.getValue() && !ru.isVisited) {
                        ru.isVisited = true
                        Line.dir = true
                        return ru
                    }
                }
            } else {
                const rdi = (row + 1) * scale + col
                if (rdi < max && col !== scale) {
                    const rd = this.hGroup.getLine(rdi)
                    if (rd.getValue() && !rd.isVisited) {
                        rd.isVisited = true
                        Line.dir = true
                        return rd
                    }
                }
                const di = index + scale + 1
                if (di < max) {
                    const d = this.vGroup.getLine(di)
                    if (d.getValue() && !d.isVisited) {
                        d.isVisited = true
                        Line.dir = false
                        return d
                    }
                }
                const ldi = (row + 1) * scale + col - 1
                if (col !== 0) {
                    const ld = this.hGroup.getLine(ldi)
                    if (ld.getValue() && !ld.isVisited) {
                        ld.isVisited = true
                        Line.dir = false
                        return ld
                    }
                }
            }
        }
        return null
    }
}

class LineGroup {
    private mode: ModeType = 'horizontal';
    private scale: number = 0;
    private list: Line[] = [];
    
    constructor(mode: ModeType, scale: number) {
        this.mode = mode
        this.scale = scale
    }
    public init(vGroup: LineGroup, hGroup: LineGroup) {
        const length = this.scale * (this.scale + 1)
        this.list = Array.from({ length }, (_, index) => new Line(this.mode, index, vGroup, hGroup))
    }
    public toggle(index: number) {
        this.list[index].toggle()
    }
    public getMode() {
        return this.mode
    }
    public getList() {
        return this.list.map(v => +v.getValue())
    }
    public getLine(index: number) {
        return this.list[index]
    }
    public getFirstIndex() {
        return this.list.findIndex(v => v.getValue())
    }
    public isWholeVisited() {
        return !this.list.some(item => !!item.getValue() && !item.isVisited)
    }
    public resetStatus() {
        this.list.forEach(e => e.isVisited = false)
    }
}

export default class PeakTurn {
    public static scale = 6
    private hGroup: LineGroup
    private vGroup: LineGroup
    private cList: number[] = []
    private mode: number = 1

    constructor() {
        this.init()
    }
    public getVGroup() {
        return this.vGroup
    }
    public getHGroup() {
        return this.hGroup
    }
    public setMode(mode: number) {
        this.mode = mode
    }
    public reset() {
        this.init()
    }
    private init() {
        const scale = PeakTurn.scale
        this.hGroup = new LineGroup('horizontal', scale)
        this.vGroup = new LineGroup('vertical', scale)
        this.hGroup.init(this.vGroup, this.hGroup)
        this.vGroup.init(this.vGroup, this.hGroup)
        this.cList = Array.from({ length: scale ** 2 }, () => 0)
    }
    public isCircle() {
        const index = this.vGroup.getFirstIndex()
        if (index === -1) {
            return false
        }
        const first = this.vGroup.getLine(index)
        let line = first
        let count = 0
        while (line) {
            count++
            line = line.next()
            if (line === null) {
                this.resetStatus()
                return false
            }
            if (line === first) {
                break
            }
        }
        if (count < 4) {
            this.resetStatus()
            return false
        }
        const flag = this.vGroup.isWholeVisited() && this.hGroup.isWholeVisited()
        this.resetStatus()
        return flag
    }
    private resetStatus() {
        this.vGroup.resetStatus()
        this.hGroup.resetStatus()
        Line.dir = true
    }
    
    public getHList() {
        return this.hGroup.getList()
    }
    public getVList() {
        return this.vGroup.getList()
    }
    public getCList() {
        return [...this.cList]
    }
    public toggleHList(index: number) {
        this.hGroup.toggle(index)
        !!this.mode && this.update()
    }
    public toggleVList(index: number) {
        this.vGroup.toggle(index)
        !!this.mode && this.update()
    }
    private update() {
        const scale = PeakTurn.scale
        this.cList.forEach((_, index) => {
            const row = index / scale | 0
            const col = index % scale
            const up = +this.hGroup.getLine(row * scale + col).getValue()
            const down = +this.hGroup.getLine(scale * (row + 1) + col).getValue()
            const left = +this.vGroup.getLine(row * (scale + 1) + col).getValue()
            const right = +this.vGroup.getLine(row * (scale + 1) + col + 1).getValue()
            this.cList[index] = up + down + left + right
        })
    }
}