/**
 *       1
 *     /   \
 *    2     3
 *   / \   / \
 *  4   5 6   7
 */

//#region test data
const g = { left: null, right: null, val: 7 }
const f = { left: null, right: null, val: 6 }
const e = { left: null, right: null, val: 5 }
const d = { left: null, right: null, val: 4 }
const c = { left: f, right: g, val: 3 }
const b = { left: d, right: e, val: 2 }
const a = { left: b, right: c, val: 1 }
//#endregion

const postOrder = function(root) {
    const stack = []
    const result = []
    let lastNode = null
    while(root !== null || stack.length) {
        while (root !== null) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        if (root.right == null || root.right == lastNode) {
            result.push(root.val)
            lastNode = root;
            root  = null;
        } else {
            stack.push(root);
            root = root.right;
        }
    }
    return result
}

console.log(postOrder(a).toString());    // 4 5 2 6 7 3 1

const preOrder = function(root) {
    const stack = []
    const result = []
    while (stack.length || root !== null) {
        while (root !== null) {
            result.push(root.val)
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        root = root.right
    }
    return result
}

console.log(preOrder(a).toString());    // 1 2 4 5 3 6 7

const inOrder = function(root) {
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

console.log(inOrder(a).toString());    // 4 2 5 1 6 3 7
