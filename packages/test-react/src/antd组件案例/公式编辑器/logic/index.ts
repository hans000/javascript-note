export interface IToken {
    type: number;
    value: string;
    offset: number;
    index: number;
}
export type ITreeOptions = Array<{
    value: string;
    text: string;
    children?: ITreeOptions;
}>

export const TokenType = {
    t_opt: 0b00000001, // 操作符
    t_num: 0b00000010, // 数字
    t_dot: 0b00000100, // .
    t_begin_bracket: 0b00001000, // 左括号
    t_end_bracket: 0b00010000, // 右括号
    t_str: 0b00100000, // 字符串
    t_start: 0b01000000, // 开始
    t_end: 0b10000000, // 结束
}
export const TokenRule = {
    [TokenType.t_start]: TokenType.t_str | TokenType.t_num | TokenType.t_begin_bracket | TokenType.t_end,
    [TokenType.t_opt]: TokenType.t_str | TokenType.t_num | TokenType.t_begin_bracket,
    [TokenType.t_num]: TokenType.t_opt | TokenType.t_end_bracket | TokenType.t_end,
    [TokenType.t_dot]: TokenType.t_str | TokenType.t_num,
    [TokenType.t_begin_bracket]: TokenType.t_str | TokenType.t_num | TokenType.t_begin_bracket,
    [TokenType.t_end_bracket]: TokenType.t_end_bracket | TokenType.t_opt | TokenType.t_end,
    [TokenType.t_str]: TokenType.t_opt | TokenType.t_dot | TokenType.t_begin_bracket | TokenType.t_end_bracket | TokenType.t_end,
    [TokenType.t_end]: TokenType.t_str | TokenType.t_num | TokenType.t_end_bracket,
}
export default function translate(expect: number): string {
    const config = {
        [TokenType.t_opt]: '"+-*/"',
        [TokenType.t_num]: '数字',
        [TokenType.t_dot]: '"."',
        [TokenType.t_begin_bracket]: '"("',
        [TokenType.t_end_bracket]: '")"',
        [TokenType.t_str]: '字符',
    }
    const reuslt = Object.values(TokenType).reduce((s, v) => {
        if (expect & v) {
            s.push(config[v])
        }
        return s
    }, []).join(', ')
    return `期望是${reuslt}`
}
const TokenOptions: { [key: number]: string[] } = {
    [TokenType.t_opt]: ['+', '-', '*', '/'], // 操作符
    [TokenType.t_dot]: ['.'], // .
    [TokenType.t_begin_bracket]: ['('], // 左括号
    [TokenType.t_end_bracket]: [')'], // 右括号
    [TokenType.t_str]: null, // 右括号
}
export function intelligence(token = TokenType.t_start, tree: ITreeOptions) {
    const expect = TokenRule[token]
    const result: Array<{ text: string, value: string }> = []
    Object.values(TokenType).forEach(type => {
        if (expect & type) {
            const options = TokenOptions[type]
            // 函数或指标
            if (options === null) {
                result.push(...tree.map(item => ({ text: item.text, value: item.value })))
            }
            // 操作符等
            if (options) {
                result.push(...options.map(item => ({ text: item, value: item })))
            }
        }
    })
    return result
}