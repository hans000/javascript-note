
export default class RandomWalk {
    private canvas: HTMLCanvasElement;
    private steps = 100

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.init()
    }

    private init() {
        this.update()
    }

    private render() {

    }

    private update() {
        this.render()
        requestAnimationFrame(this.update.bind(this))
    }
    
}