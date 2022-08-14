import { IXNode, input, enumerate, XNode, output } from "."

export default class Interpolation extends XNode {

    public static key = 'Interpolation'

    @input()
    weight = 0

    @enumerate(['line', 'cos', 'ease'])
    fade = 'ease'

    @output()
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