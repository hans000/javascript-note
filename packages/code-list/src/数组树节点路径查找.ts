/**
 *        A
 *     B      C
 *   D  E   F
 */

const F = { id: 'F', children: [] }
const E = { id: 'E', children: [] }
const D = { id: 'D', children: [] }
const C = { id: 'C', children: [F] }
const B = { id: 'B', children: [D, E] }
const A = { id: 'A', children: [B, C] }

interface TreeNode {
    id: string
    children: TreeNode[]
}

 
function findPath(data: TreeNode[], nodeId: string, path: string[] = []): string[] | null {
    const newPath: string[] = [...path]
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        newPath.push(node.id)
        if (node.id === nodeId) {
            return newPath
        }
        const result = findPath(node.children, nodeId, newPath)
        if (result) {
            return result
        }
        newPath.pop()
    }
    return null
}

console.log(findPath([A], 'F'))