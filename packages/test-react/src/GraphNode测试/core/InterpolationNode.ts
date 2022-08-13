import { IXNode, input, enumerate } from "."

export default class Interpolation implements IXNode {
    @input()
    weight = 0

    @enumerate(['line', 'cos', 'ease'])
    fade = 'ease'

    getValue() {
        switch (this.fade) {
            case 'line':
                return this.weight
            case 'cos':
                return 0.5 * (1 - Math.cos(Math.PI * this.weight))
            case 'ease':
                return 3 * this.weight ** 2 - 2 * this.weight ** 3
            default:
                throw ('error')
        }
    }
}