import { enumerate, input, IXNode, output, XNode } from ".";

export class OperationNode extends XNode {
    public static key = 'OperationNode'

    @input()
    a = 1;

    @input({
        name: '操作数',
        description: '这是第二个操作数'
    })
    b = 2;

    @enumerate(['add', 'substract', 'multiple', 'divide'])
    type = 'add'

    @output()
    getValue() {
        switch (this.type) {
            case 'add':
                return this.a + this.b
            case 'substract':
                return this.a - this.b
            case 'multiple':
                return this.a * this.b
            case 'divide':
                return this.a / this.b
            default:
                throw ('error')
        }
    }
}