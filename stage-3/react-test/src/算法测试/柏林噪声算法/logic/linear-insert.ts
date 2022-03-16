import { CanvasWidth, CanvasHeight } from "../constants"
import { drawLineByPoints } from "../tools"
import { Point } from "../type"
import { fade } from "../utils"

export default class LinearInsert {
    private points: Point[] = []
    private segments: Point[] = []
    private handleFrame: number = 0
    private canvas: HTMLCanvasElement
    private domRect: DOMRect

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.domRect = this.canvas.getBoundingClientRect()
        this.load()
    }

    private get ctx() {
        return this.canvas.getContext('2d')
    }

    private load() {
        this.bindEvent()
        this.update()
    }
    public dispose() {
        this.unbindEvent()
        this.clear()
        cancelAnimationFrame(this.handleFrame)
    }
    

    private segment(p1: Point, p2: Point, segmentCount = 100) {
        this.segments = []

        const Dx = p2.x - p1.x
        const dx = Dx / segmentCount

        for (let i = 0; i < segmentCount; i++) {
            const x = p1.x + i * dx
            const y = p1.y + fade(i / 100) * (p2.y - p1.y)
            this.segments.push({ x, y })
        }
    }

    private handleClick(ev: MouseEvent) {
        const { left, top } = this.domRect
        const { clientX: cx, clientY: cy } = ev
        const x = cx - left
        const y = cy - top

        if (this.points.length === 2) {
            this.points.length = 0
        }

        this.points.push({ x, y })

        if (this.points.length === 2) {
            const [p1, p2] = this.points
            this.segment(p1, p2)
        }
    }

    public render() {
        this.points.forEach(p => {
            this.drawPoint(p.x, p.y)
        })
        drawLineByPoints(this.ctx, this.segments)
    }

    private clear() {
        this.ctx.clearRect(0, 0, CanvasWidth, CanvasHeight)
    }

    private drawPoint(x: number, y: number) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, 2, 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.closePath()
    }

    private update() {
        this.clear()
        this.render()
        this.handleFrame = requestAnimationFrame(this.update.bind(this))
    }

    private bindEvent() {
        this.canvas.addEventListener('click', this.handleClick.bind(this))
    }

    private unbindEvent() {
        this.canvas.removeEventListener('click', this.handleClick.bind(this))
    }
}