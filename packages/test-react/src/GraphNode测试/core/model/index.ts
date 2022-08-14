import { analysis, AnalysisResult, XNode } from "../xnode";
import NodeSprite from "./NodeSprite";
import Sprite from "./Sprite";

export function randId() {
    return Math.random().toString(36).slice(2)
}

export interface SpriteProps extends AnalysisResult {
    id: string
}

export class Scene {
    private static _map = new Map<string, typeof XNode>()
    private _sprites: NodeSprite[] = []
    
    public static registXNode(xnode: typeof XNode) {
        Scene._map.set(xnode.key, xnode)
    }

    public static getXNodeTypes() {
        return [...Scene._map.keys()]
    }

    public static getXNodeByKey(key: string) {
        return Scene._map.get(key)
    }

    public add(key: string) {
        const Ctor = Scene.getXNodeByKey(key)
        if (Ctor) {
            this._sprites.push(new NodeSprite(new Ctor()))
        }
    }

    public toJson() {
        return this._sprites.map(sprite => {
            return {
                id: sprite.node.id,
                ...analysis(sprite.node.constructor)
            } as SpriteProps
        })
    }
}