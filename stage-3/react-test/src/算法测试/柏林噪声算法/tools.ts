import { Point } from "./type"

export function useCanvasContext() {
    const canvas = document.querySelector('canvas')!
    // const ratio = window.devicePixelRatio
    // let oldWidth = canvas.width;
    // let oldHeight = canvas.height;
    // canvas.width = oldWidth * ratio;
    // canvas.height = oldHeight * ratio;
    // canvas.style.width = oldWidth + 'px';
    // canvas.style.height = oldHeight + 'px';
    const ctx = canvas.getContext('2d')!
    // ctx.scale(ratio, ratio);
    return { canvas, ctx }
}

export function drawLineByPoints(ctx: CanvasRenderingContext2D, points: Point[]) {
    ctx.beginPath()
    ctx.strokeStyle = '#000'
    points.forEach((p, i) => {
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
    })
    ctx.stroke()
    ctx.closePath()
}

export function drawPixels(ctx: CanvasRenderingContext2D, data: number[], width: number, height: number, dx = 0, dy = 0) {
    ctx.putImageData(new ImageData(new Uint8ClampedArray(data), width, height), dx, dy)
}