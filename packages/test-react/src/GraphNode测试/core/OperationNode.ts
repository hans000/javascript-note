import { enumerate, input, IXNode } from ".";

export class OperationNode implements IXNode {
    @input()
    a = 1;

    @input({
        name: '操作数',
        description: '这是第二个操作数'
    })
    b = 2;

    @enumerate(['add', 'substract', 'multiple', 'divide'])
    type = 'add'

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