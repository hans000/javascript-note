import { generateMatrix } from "./perlin-2-d";

export default class DirtGrass {
    private canvas: HTMLCanvasElement
    private perlinData: number[]
    private count = 8
    private hits = 32
    private threshold = 255
    private imageList: HTMLImageElement[] = []
    private offsetX = 0
    private offsetY = 0
    private opacity: number = 1;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.load()
    }

    private load() {
        this.loadSource([
            '/img/perlin/dirt.png',
            '/img/perlin/grass.png',
        ]).then((imageList) => {
            this.imageList = imageList
            this.update()
        })
    }

    private update() {
        if (this.imageList.length) {
            this.loadImage(this.imageList)
            this.loadPerlin()
            this.mergeImage(this.imageList)
        }
    }

    private loadSource(list: string[]) {
        return Promise.all(list.map(src => new Promise<HTMLImageElement>(resolve => {
            const image = new Image()
            image.src = src
            image.onload = () => resolve(image)
        })))
    }

    private mergeImage(imageList: HTMLImageElement[]) {
        this.drawImage(imageList[0], 220, 220)
        const dest = this.ctx.getImageData(220, 0, 200, 200).data
        
        this.ctx.beginPath()
        for (let i = 0; i < 200; i++) {
            for (let j = 0; j < 200; j++) {
                const y = i + 220
                const x = j + 220

                const o = i * 200 + j
                const r = dest[o * 4 + 0]
                const g = dest[o * 4 + 1]
                const b = dest[o * 4 + 2]

                const oo = (this.hits * this.count + 1) * i + j
                const a = this.perlinData[oo]
                if (a < this.threshold) {
                    continue
                }
                this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * (a / 128)})`
                this.ctx.fillRect(x, y, 1, 1)
            }
        }
        this.ctx.closePath()
        this.ctx.save()
    }

    public setOpacity(opacity: number) {
        this.opacity = opacity
        this.update()
    }

    public setThreshold(threshold: number) {
        this.threshold = threshold
        this.update()
    }

    public setOffsetX(offsetX: number) {
        this.offsetX = offsetX
        this.update()
    }

    public setOffsetY(offsetY: number) {
        this.offsetY = offsetY
        this.update()
    }

    private loadPerlin() {
        this.perlinData = generateMatrix({
            count: this.count,
            hits: this.hits,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
        })
        console.log(this.perlinData);
        
        this.ctx.beginPath()
        for (let i = 0; i < 200; i++) {
            for (let j = 0; j < 200; j++) {
                const y = i + 220
                const x = j
                const v = this.perlinData[i * (this.hits * this.count + 1) + j] || 0
                const color = '#' + v.toString(16).padStart(2, '0').repeat(3)
                this.ctx.fillStyle = color
                this.ctx.fillRect(x, y, 1, 1)
            }
        }
        this.ctx.closePath()
        this.ctx.save()
    }

    private loadImage(imageList: HTMLImageElement[]) {
        const [dirt, grass] = imageList
        this.drawImage(dirt, 0)
        this.drawImage(grass, 220)

        this.drawImage(dirt, 440)
        this.drawImage(grass, 440, 0, 0.4)
    }

    private drawImage(image: HTMLImageElement, offsetX = 0, offsetY = 0, alpha = 1) {
        this.ctx.globalAlpha = alpha
        this.ctx.beginPath()
        this.ctx.drawImage(image, 0, 0, 200, 200, offsetX, offsetY, 200, 200)
        this.ctx.closePath()
        this.ctx.save()
        this.ctx.globalAlpha = 1
    }

    private get ctx() {
        return this.canvas.getContext('2d')
    }
}