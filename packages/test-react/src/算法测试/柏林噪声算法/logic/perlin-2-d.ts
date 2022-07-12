import { drawPixels } from "../tools"
import { perlin2, perlinNois2 } from "../utils"
import noise from 'simplex-noise'

interface PerlinOptions {
    hits?: number
    count?: number
    offsetX?: number
    offsetY?: number
}

export function generateMatrix(options: PerlinOptions = {}) {
    const defaultOptions = {
        hits: 4,
        count: 4,
        offsetX: 0,
        offsetY: 0,
    }

    const { hits, count, offsetX, offsetY } = Object.assign(defaultOptions, options)
    const result: number[] = []
    const simplex = new noise()
    for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
            const dc = 1 / hits
            for (let i = 0; i <= hits; i++) {
                for (let j = 0; j <= hits; j++) {
                    const y = row + dc * i + offsetY
                    const x = col + dc * j + offsetX
                    
                    let value = ((simplex.noise2D(x, y) + 1) / 2 * 256) | 0
                    const index = (hits * count + 1) * (row * hits + i) + (col * hits + j)
                    result[index] = value
                }
            }
        }
    }
    return result
}

export default class Perlin2Demision {
    private handleFrame: number = 0
    private grays: number[] = []
    private canvas: HTMLCanvasElement
    private offsetX = 0
    private offsetY = 0
    private hits = 0
    private count = 0
    private r = 0
    private g = 0
    private b = 0

    constructor(canvas: HTMLCanvasElement, options: PerlinOptions = {}) {
        this.canvas = canvas;
        const mergeOptions = Object.assign({ hits: 64, count: 4 }, options)
        this.hits = mergeOptions.hits
        this.count = mergeOptions.count
        this.load()
    }

    private get ctx() {
        return this.canvas.getContext('2d')
    }

    private render() {
        this.ctx.clearRect(0, 0, 800, 600)
        this.drawGrays()
    }
    public setR(value: number) {
        this.r = value
        this.update()
    }
    public setG(value: number) {
        this.g = value
        this.update()
    }
    public setB(value: number) {
        this.b = value
        this.update()
    }
    private drawGrays() {
        const size = this.hits * this.count + 1
        const data = []
        for (let i = 0; i < this.grays.length; i++) {
            const v = this.grays[i];
            const r = ((v + this.r) & 0xff)
            const g = ((v + this.g) & 0xff)
            const b = ((v + this.b) & 0xff)
            const a = 255
            data[i * 4 + 0] = r
            data[i * 4 + 1] = g
            data[i * 4 + 2] = b
            data[i * 4 + 3] = a
        }
        drawPixels(
            this.ctx,
            data,
            size,
            size,
        )
    }
    private update() {
        this.dispose()
        this.render()
        this.handleFrame = requestAnimationFrame(() => this.update())
    }
    private initData() {
        this.grays = generateMatrix({
            hits: this.hits,
            count: this.count,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
        })
        
    }
    public load() {
        this.initData()
        this.update()
    }

    public setOffsetX(x: number) {
        this.offsetX = x
        this.initData()
    }

    public setOffsetY(y: number) {
        this.offsetY = y
        this.initData()
    }

    public dispose() {
        this.handleFrame != null && cancelAnimationFrame(this.handleFrame)
    }
}