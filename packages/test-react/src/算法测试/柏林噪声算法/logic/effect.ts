import { CanvasWidth, CanvasHeight } from './../constants';
import { generateMatrix } from "./perlin-2-d";

export default class Effect {
    private canvas: HTMLCanvasElement
    private imageList: HTMLImageElement[];
    private perlinData: number[];
    private hits = 100;
    private count = 10;
    private offsetX = 0;
    private offsetY = 0;
    private threshold = 255

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.load()
    }

    private loadSource(list: string[]) {
        return Promise.all(list.map(src => new Promise<HTMLImageElement>(resolve => {
            const image = new Image()
            image.src = src
            image.onload = () => resolve(image)
        })))
    }

    public load() {
        this.loadPerlin()
        this.loadSource(['/img/perlin/scene.png',])
            .then(imageList => {
                this.imageList = imageList
                this.ctx.drawImage(this.imageList[0], 0, 0)
                this.update()
            })
    }

    private loadPerlin() {
        this.perlinData = generateMatrix({
            hits: this.hits,
            count: this.count,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
        })
    }

    private update() {
        this.draw()
        requestAnimationFrame(() => this.update())
    }

    private draw() {
        this.ctx.fillStyle = '#fff'
        for (let i = 0; i < CanvasWidth; i++) {
            for (let j = 0; j < CanvasHeight; j++) {
                const o = (this.hits * this.count + 1) * i + j
                const v = this.perlinData[o]

                const a = this.threshold - v
                if (a >= 1 && a <= 3) {
                    this.ctx.fillRect(i, j, 1, 1)
                }
            }
        }
        this.threshold -= 3
    }

    private get ctx() {
        return this.canvas.getContext('2d')
    }
}