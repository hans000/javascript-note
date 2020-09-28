let b = {
    left: null,
    right: null,
    val: 3
}
let a = {
    left: b,
    right: null,
    val: 2
}
let root = {
    left: null,
    right: a,
    val: 1
}

const inorderTraversal = function(root) {
    const stack = []
    const result = []
    while(root !== null || stack.length) {
        while (root !== null) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        result.push(root.val)
        root = root.right
    }
    return result
}
console.log(inorderTraversal(root));