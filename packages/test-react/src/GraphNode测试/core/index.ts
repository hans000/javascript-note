import 'reflect-metadata'

export interface IXNode {
    getValue(): any
}

export interface NodeOptions {
    key?: string
    name?: string
    description?: string

    // 数据类型
    min?: number
    max?: number

    // 枚举
    enums?: Array<string | number>
}

export type InputNodeOptions = Omit<NodeOptions, 'enums'>
export type EnumerateNodeOptions = Omit<NodeOptions, 'min' | 'max'>

export function input(options?: NodeOptions) {
    return function(target: Object, propertyKey: string) {
        Reflect.defineMetadata('XNode:input:' + propertyKey, options, target.constructor)
    }
}

export function enumerate(list: string[] | NodeOptions) {
    return function(target: Object, propertyKey: string) {
        if (Array.isArray(list)) {
            list = { enums: list }
        }
        Reflect.defineMetadata('XNode:enumerate:' + propertyKey, list, target.constructor)
    }
}

export interface AnalysisResult {
    input: NodeOptions[],
    enumerate: NodeOptions[]
}


export function analysis(ctor: Object) {
    const result: AnalysisResult = {
        input: [],
        enumerate: [],
    }
    Reflect.getMetadataKeys(ctor).forEach(metadataKey => {
        const index = metadataKey.lastIndexOf(':')
        const type = metadataKey.slice(0, index)
        const key = metadataKey.slice(index + 1)
        const options = Reflect.getMetadata(metadataKey, ctor)
        if (type === 'XNode:input') {
            result.input.push({
                key,
                ...options,
            })
        }
        if (type === 'XNode:enumerate') {
            result.enumerate.push({
                key,
                ...options,
            })
        }
    })

    return result
}
