export function clsx(object: Record<string, boolean>) {
    return Object.keys(object).filter(key => !!object[key]).join(' ')
}