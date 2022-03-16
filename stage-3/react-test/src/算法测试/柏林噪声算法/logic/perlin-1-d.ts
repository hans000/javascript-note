import { CanvasWidth, CanvasHeight } from "../constants"
import { drawLineByPoints } from "../tools"
import { Point } from "../type"
import { FadeType, perlin1 } from "../utils"

const Scale = 4
const Gap = 0.1

export default class Perlin1Demision {
    private handleFrame: number = 0
    private points: Point[] = []
    private points2: Point[] = []
    private offset = 0
    private offset2 = 0
    private canvas: HTMLCanvasElement
    private fadeType: FadeType = 'fade'
    private amplitude = 1
    private frequency = 1

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.load()
    }

    private get ctx() {
        return this.canvas.getContext('2d')
    }
    
    private render() {
        this.ctx.clearRect(0, 0, 800, 600)
        drawLineByPoints(this.ctx, this.points)
        drawLineByPoints(this.ctx, this.points2)
        // this.drawSelectBox()
    }
    private drawSelectBox() {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#ff333333'
        const o = this.offset2 / 100 * (CanvasWidth - 200)
        this.ctx.fillRect(0 + o, 40, (CanvasWidth) / Scale, 110)
        this.ctx.fill()
        this.ctx.closePath()
    }
    private update() {
        this.initData()
        this.render()
        this.handleFrame = requestAnimationFrame(() => this.update())
    }
    private initData() {
        const Count = (100 / this.frequency) | 0
        this.points = []
        this.points2 = []
        const dx = CanvasWidth / Count
        // const Gap = this.frequency
        const o = this.offset //* Count / 100 * Gap / Scale
        for (let i = 0; i < Count; i++) {
            const x = dx * i
            const y = (perlin1(i * Gap + o, this.fadeType) + 100) * this.amplitude
            // const y = Math.random() * 200 + 100
            this.points.push({ x, y })
        }
        // const oo = this.offset2 * Count / (100 / .75) * Gap
        // for (let i = 0; i < Count; i++) {
        //     const x = dx * i
        //     const y = (perlin(i * Gap / Scale + oo + o, this.fadeType) * Scale + 350) * this.amplitude
        //     // const y = Math.random() * 200 + 100
        //     this.points2.push({ x, y })
        // }
    }
    public load() {
        this.update()
    }

    public setFadeType(type: FadeType) {
        this.fadeType = type
    }

    public setAmplitude(amplitude: number) {
        this.amplitude = amplitude
    }

    public setFrequency(frequency: number) {
        this.frequency = frequency
    }

    public setOffset(offset: number) {
        this.offset = offset
    }
    public setOffset2(offset: number) {
        this.offset2 = offset
    }

    public dispose() {
        cancelAnimationFrame(this.handleFrame)
    }
}