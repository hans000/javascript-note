
export interface Point {
    x: number
    y: number
}

export interface ComponentOptions {
    install: () => void
    dispose: () => void
}

export interface PageConfig {
    name: string
    component: any
}

export type Vector = Vector2 | Vector3
export type Vector2 = [number, number]
export type Vector3 = [number, number, number]