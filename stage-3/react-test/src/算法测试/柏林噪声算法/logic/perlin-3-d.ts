import { drawPixels } from "../tools"
import { perlin3, perlinNoise3 } from "../utils"

interface PerlinOptions {
    hits?: number
    count?: number
    offsetX?: number
    offsetY?: number
    offsetZ?: number
}

export function generateMatrix(options: PerlinOptions = {}) {
    const defaultOptions = {
        hits: 16,
        count: 16,
        offsetX: 0,
        offsetY: 0,
        offsetZ: 0,
    }

    const { hits, count, offsetX, offsetY, offsetZ } = Object.assign(defaultOptions, options)
    const result: number[] = []
    for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
            for (let deep = 0; deep < count; deep++) {
                const dc = 1 / hits
                for (let i = 0; i <= hits; i++) {
                    for (let j = 0; j <= hits; j++) {
                        for (let k = 0; k <= hits; k++) {
                            const y = row + dc * i + offsetY
                            const x = col + dc * j + offsetX
                            const z = deep + dc * k + offsetZ
                            const value = (perlinNoise3(x, y, z) * 256) | 0
                            const index = (hits * count + 1) ** 2 * (deep * hits + k) + (hits * count + 1) * (row * hits + i) + (col * hits + j)
                            result[index] = value
                        }
                    }
                }
            }
        }
    }
    return result
}

export default class Perlin3Demision {
    private handleFrame: number = 0
    private grays: number[] = []
    private canvas: HTMLCanvasElement
    private offsetX = 0
    private offsetY = 0
    private offsetZ = 0
    private hits = 0
    private count = 0
    private deep = 0

    constructor(canvas: HTMLCanvasElement, options: PerlinOptions = {}) {
        this.canvas = canvas;
        const mergeOptions = Object.assign({ hits: 32, count: 6 }, options)
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
        this.deep += 1
    }
    private drawGrays() {
        const size = this.hits * this.count + 1
        // const cell = 1
        // this.ctx.beginPath()
        // for (let i = 0; i < size; i++) {
        //     for (let j = 0; j < size; j++) {
        //         const v = this.grays[(size * i + j + (this.deep | 0) * size ** 2) % size ** 3]
        //         const r = ((v + 131) & 0xff).toString(16).padStart(2, '0')
        //         const g = ((v + 143) & 0xff).toString(16).padStart(2, '0')
        //         const b = ((v + 197) & 0xff).toString(16).padStart(2, '0')
        //         const color = `#${r}${g}${b}`
        //         // const color = '#' + v.toString(16).padStart(2, '0').repeat(3)
        //         this.ctx.fillStyle = color
        //         this.ctx.fillRect(i * cell, j * cell, cell, cell)
        //     }
        // }
        // this.ctx.closePath()
        // this.ctx.save()
        const data = []
        for (let i = 0; i < this.grays.length; i++) {
            const v = this.grays[i];
            const r = ((v + 131) & 0xff)
            const g = ((v + 143) & 0xff)
            const b = ((v + 197) & 0xff)
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

    public setOffsetZ(z: number) {
        this.offsetZ = z
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