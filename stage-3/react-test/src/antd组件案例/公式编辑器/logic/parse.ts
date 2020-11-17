import { IToken } from './index';
import { TokenRule, TokenType } from ".";
import MatchExpection from "./MatchExpection";
import SyntaxExpection from "./SyntaxExpection";

const START_TOKEN: IToken = { value: null, offset: -1, type: TokenType.t_start, index: -1 }
const END_TOKEN: IToken = { value: null, offset: -1, type: TokenType.t_end, index: -1 }

function getTokens(text: string) {
    const result: IToken[] = [START_TOKEN]
    const match = text.match(/((\d+)(\.\d+)?|\(|\)|\+|\-|\.|[^\+\-*\/\(\)\.]+)/g)
    if (match) {
        let index = 0, type = TokenType.t_str
        for (let i = 0; i < match.length; i++) {
            const value = match[i];
            if ('.' === value) {
                type = TokenType.t_dot
            } else if ('(' === value) {
                type = TokenType.t_begin_bracket
            } else if (')' === value) {
                type = TokenType.t_end_bracket
            } else if ('+-*/'.includes(value)) {
                type = TokenType.t_opt
            } else if (/(\d+)(\.\d+)?/.test(value)) {
                type = TokenType.t_num
            } else {
                type = TokenType.t_str
            }
            result.push({ value, offset: index, type, index: i })
            index += value.length
        }
    }
    result.push(END_TOKEN)
    return result
}
export default function parse(text: string) {
    const tokens = getTokens(text)
    const stack = []
    const result = []
    let expect = TokenRule[tokens.shift().type]
    while (tokens.length) {
        const token = tokens.shift()
        if (!(expect & token.type)) {
            const t = result[result.length - 1]
            if (token.type === TokenType.t_end) {
                throw new SyntaxExpection(expect, t ? t : START_TOKEN, [...result, ...tokens.slice(0, -1)])
            }
            throw new SyntaxExpection(expect, token, [...result, token, ...tokens.slice(0, -1)])
        }
        if (token.type === TokenType.t_begin_bracket) {
            stack.push(token)
        }
        if (token.type === TokenType.t_end_bracket) {
            if (!stack.length) {
                // 缺少开始括号
                throw new MatchExpection(null, token, [...result, token, ...tokens.slice(0, -1)])
            }
            stack.pop()
        }
        expect = TokenRule[token.type]
        result.push(token)
    }
    if (stack.length) {
        // 缺少结束括号
        throw new MatchExpection(stack[stack.length - 1], null, [...result, ...tokens.slice(0, -1)])
    }
    result.pop()
    return result
}
