import { Point } from './../type';
import { CanvasHeight, CanvasWidth } from './../constants';
import { drawLineByPoints } from '../tools';
import { fade, mix } from '../utils';

const Hits = 32
const fftSize = 256

export default class Wave {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.load()
    }

    private get ctx() {
        return this.canvas.getContext('2d')
    }

    private load() {
        // const mplayer = Wmplayer.create('./1.mp3', { fftSize, })

        // mplayer.onload = () => {
        //     mplayer.play()
        //     setInterval(
        //         () => {
        //             this.render(mplayer.getData())
        //         },
        //         1000 / 60
        //     )
        // }
    }

    private render(data: Uint8Array) {
        this.ctx.clearRect(0, 0, CanvasWidth, CanvasHeight)
        const points: Point[] = []

        const perangle = Math.PI * 2 / 64
        for (let i = 32; i < 96; i++) {
            const angle = perangle * i
            const v = data[i]
            const v2 = data[(i + 1) % 96 + 32]
            for (let j = 0; j < Hits; j++) {
                const f = 1 / Hits * j
                const vv = mix(v, v2, f)
                const x = Math.cos(angle) * vv + 200
                const y = Math.sin(angle) * vv + 200
                points.push({ x, y })
            }
        }

        drawLineByPoints(this.ctx, points)
    }
}