const Type = {
    t_opt: 0b00000001, // 操作符
    t_num: 0b00000010, // 数字
    t_dot: 0b00000100, // .
    t_begin_bracket: 0b00001000, // 左括号
    t_end_bracket: 0b00010000, // 右括号
    t_str: 0b00100000, // 字符串
}
function translate(expect) {
    const config = {
        [Type.t_opt]: '"+-*/"',
        [Type.t_num]: '数字',
        [Type.t_dot]: '"."',
        [Type.t_begin_bracket]: '"("',
        [Type.t_end_bracket]: '")"',
        [Type.t_str]: '字符',
    }
    const reuslt = Object.values(Type).reduce((s, v) => {
        if (expect & v) {
            s.push(config[v])
        }
        return s
    }, []).join(', ')
    return `期望是${reuslt}`
}

const rules = {
    [Type.t_opt]: Type.t_str | Type.t_num | Type.t_begin_bracket,
    [Type.t_num]: Type.t_opt | Type.t_end_bracket,
    [Type.t_dot]: Type.t_str | Type.t_num,
    [Type.t_begin_bracket]: Type.t_str | Type.t_num | Type.t_begin_bracket,
    [Type.t_end_bracket]: Type.t_end_bracket | Type.t_opt,
    [Type.t_str]: Type.t_opt | Type.t_dot | Type.t_begin_bracket | Type.t_end_bracket,
}
function getTokens(text) {
    const result = []
    const match = text.match(/((\d+)(\.\d+)?|\(|\)|\+|\-|\.|[^\+\-*\/\(\)\.]+)/g)
    if (match) {
        let index = 0, type = Type.t_str
        for (let i = 0; i < match.length; i++) {
            const value = match[i];
            if ('.' === value) {
                type = Type.t_dot
            } else if ('(' === value) {
                type = Type.t_begin_bracket
            } else if (')' === value) {
                type = Type.t_end_bracket
            } else if ('+-*/'.includes(value)) {
                type = Type.t_opt
            } else if (/(\d+)(\.\d+)?/.test(value)) {
                type = Type.t_num
            } else {
                type = Type.t_str
            }
            result.push({ value, index, type })
            index += value.length
        }
    }
    return result
}
function parse(text) {
    const tokens = getTokens(text)
    const stack = []
    const result = []
    let expect = Type.t_str | Type.t_begin_bracket | Type.t_num
    while (tokens.length) {
        const token = tokens.shift()
        if (!(expect & token.type)) {
            throw new SyntaxError(expect, token)
        }
        if (token.type === Type.t_begin_bracket) {
            stack.push(token)
        }
        if (token.type === Type.t_end_bracket) {
            if (!stack.length) {
                // 缺少开始括号
                throw new MatchError(null, token)
            }
            stack.pop()
        }
        expect = rules[token.type]
        result.push(token)
    }
    if (stack.length) {
        // 缺少结束括号
        throw new MatchError(stack[stack.length - 1], null)
    }
    return result
}

class MatchError {
    constructor(begin, end) {
        this.begin = begin
        this.end = end
    }
    toString() {
        if (this.end) {
            return `缺少开始括号与其匹配, ${this.end.index}`
        } else {
            return `缺少结束括号与其匹配，${this.begin.index}`
        }
    }
}
class SyntaxError {
    constructor(expect, token) {
        this.expect = expect
        this.token = token
    }
    toString() {
        return translate(this.expect) + `, 但却是${this.token.value}`
    }
}
try {
    console.log(parse('求和(项目一.子项目+项目儿+10.1-78'));
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`${error.toString()}`);
    } else if (error instanceof MatchError) {
        console.log(`${error.toString()}`)
    } else {
        console.log(error);
    }
}
