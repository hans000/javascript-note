import translate, { IToken } from './index';

export default class SyntaxExpection {
    private expect: number;
    private token: IToken;
    private tokens: IToken[];

    constructor(expect: number, token: IToken, tokens: IToken[]) {
        this.expect = expect
        this.token = token
        this.tokens = tokens
    }
    getToken() {
        return this.token
    }
    getTokens() {
        return this.tokens
    }
    toString() {
        return translate(this.expect) + (this.token.value !== null ? `, 但却是${this.token.value}` : '')
    }
}