
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