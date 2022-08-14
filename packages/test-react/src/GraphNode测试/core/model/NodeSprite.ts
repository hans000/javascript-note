import { XNode } from "../xnode"
import Sprite from "./Sprite"

interface LinkProps {
    key: string
    node: XNode
}

export default class NodeSprite extends Sprite {
    private _node: XNode
    private _linkList: LinkProps[] = []

    constructor(xnode: XNode) {
        super()
        this._node = xnode
    }

    public get node() {
        return this._node
    }

    public link(key: string, node: XNode) {
        this._linkList.push({ key, node })
    }

    
}