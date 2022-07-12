
export enum SpriteKind {
    Empty,
    Stone,
    Star,
    Target,
}

export enum DirKind {
    Up,
    Right,
    Down,
    Left,
}

export class Logic {
    private map: number[] = []
    private success = false

    public static Scale = 8

    constructor(map?: number[]) {
        this.success = false
        this.map = map ? map : Array.from({ length: Logic.Scale ** 2 }, () => SpriteKind.Empty)
    }

    public getMap() { return [...this.map] }

    private getOffset(row: number, col: number) {
        return Logic.Scale * row + col
    }

    private getData(row: number, col: number) {
        return this.map[this.getOffset(row, col)]
    }

    public isOk() {
        return this.success
    }

    private isValid(row: number, col: number, cx: number, cy: number) {
        return (
            cx >= 0 &&
            cy >= 0 &&
            cx < Logic.Scale &&
            cy < Logic.Scale
        )
    }

    public move(index: number, dir: DirKind) {
        const offsetVectors = [ [0, -1], [1, 0], [0, 1], [-1, 0] ]
        const [vx, vy] = offsetVectors[dir]

        const row = index / Logic.Scale | 0
        const col = index % Logic.Scale

        let cx = col
        let cy = row

        while (true) {
            cy += vy
            cx += vx
            const next = this.getData(cy, cx)

            // 出界
            if (! this.isValid(row, col, cx, cy)) {
                this.map[this.getOffset(row, col)] = SpriteKind.Empty
                break
            }

            // 碰撞
            if (next && next !== SpriteKind.Target) {
                const newIndex = this.getOffset(cy - vy, cx - vx)
                if (this.map[newIndex] === SpriteKind.Target) {
                    this.success = true
                }
                this.map[newIndex] = this.map[index]
                if (newIndex !== this.getOffset(row, col)) {
                    this.map[this.getOffset(row, col)] = SpriteKind.Empty
                }
                break
            }
        }
        return this.getMap()
    }

    public moveUp(index: number) {
        return this.move(index, DirKind.Up)
    }

    public moveRight(index: number) {
        return this.move(index, DirKind.Right)
    }

    public moveDown(index: number) {
        return this.move(index, DirKind.Down)
    }

    public moveLeft(index: number) {
        return this.move(index, DirKind.Left)
    }
}