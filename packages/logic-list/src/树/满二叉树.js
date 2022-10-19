function isEmptyNode(value) {
    return value == null
}
/**
 * 根节点为空直接返回false
 * 否则维护一个队列，层序遍历
 * 1. 如果左右子节点都不为空，该节点出队列，子节点入队列
 * 2. 如果左子节点为空，右子节点不为空，则判定为false
 * 3. 如果右子节点为空，则队列的后续节点必须都为叶子节点才判定为完全二叉树
 */
function isComplete(tree) {
    if (! tree?.length) return false

    const queue = []
    queue.push({ index: 0, value: tree[0] })

    while (queue.length) {
        const { index, value } = queue[0]
        const left = tree[index * 2 + 1]
        const right = tree[index * 2 + 2]
        if (!isEmptyNode(left) && !isEmptyNode(right)) {
            queue.shift()
            queue.push({ index: index * 2 + 1, value: left })
            queue.push({ index: index * 2 + 2, value: right })
            continue
        }
        if (isEmptyNode(left) && !isEmptyNode(right)) {
            return false
        }
        // 判断后续节点为叶子节点
        while (queue.length) {
            const { index, value } = queue[0]
            const left = tree[index * 2 + 1]
            const right = tree[index * 2 + 2]
            if (!isEmptyNode(left) || !isEmptyNode(right)) {
                return false
            }
            queue.shift()
        }
        return true
    }

    return false
}

/**
 *          1
 *         / \
 *        2   3
 *       / \
 *      4   5  
 */
console.log(isComplete([1, 2, 3, 4, 5, null, null]) === true)
/**
 *          1
 *         / \
 *        2   3
 *       /   /
 *      4   5  
 */
console.log(isComplete([1, 2, 3, 4, null, 5, null]) === false)
