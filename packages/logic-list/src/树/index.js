/**
 *       1
 *     /   \
 *    2     3
 *   / \   / \
 *  4   5 6   7
 */

//  前序可以很方便地形成一条搜索路径，
//  中序遍历BST的时候可以得到一个有序序列，
//  后序可以用来计算一颗算数表达式树

//#region test data
const g = { left: null, right: null, val: 7 }
const f = { left: null, right: null, val: 6 }
const e = { left: null, right: null, val: 5 }
const d = { left: null, right: null, val: 4 }
const c = { left: f, right: g, val: 3 }
const b = { left: d, right: e, val: 2 }
const a = { left: b, right: c, val: 1 }
//#endregion

/**
 * 先序遍历 根左右
 * @param {*} root 
 * @returns 
 */
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

/**
 * 中序遍历 左根右
 * @param {*} root 
 * @returns 
 */
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

/**
 * 后续遍历 左右根
 * @param {*} root 
 * @returns 
 */
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