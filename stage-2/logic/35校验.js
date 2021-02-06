

const text = `
a ab abb ccc AA wdwd iied
`

function validate(text) {
    const result = []
    const reg = /\b([a-z])\1{2,}\b/g
    while (m = reg.exec(text)) {
        result.push(m)
    }
    return result
}

validate(text)