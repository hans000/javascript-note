
export function formatPoetry(text: string) {
    const result: string[] = []
    let head = 0
    for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (/(。|？)/.test(ch)) {
            result.push(text.slice(head, i + 1))
            head = i + 1
        }
    }
    return result
}