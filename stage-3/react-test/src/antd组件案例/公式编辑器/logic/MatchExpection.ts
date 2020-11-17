import { IToken } from './index';

export default class MatchExpection {
    private begin: IToken;
    private end: IToken;
    private tokens: IToken[];

    constructor(begin: IToken, end: IToken, tokens: IToken[]) {
        this.begin = begin
        this.end = end
        this.tokens = tokens
    }
    getToken() {
        return this.end ? this.end : this.begin
    }
    getTokens() {
        return this.tokens
    }
    toString() {
        if (this.end) {
            return `缺少开始括号与其匹配, ${this.end.offset}`
        } else {
            return `缺少结束括号与其匹配，${this.begin.offset}`
        }
    }
}