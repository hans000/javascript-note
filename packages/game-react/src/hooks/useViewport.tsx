import useMatchMedia from "./useMatchMedia"

export enum Breakpoints {
    XSmall = '(max-width: 480px)',
    Small = '(min-width: 480px) and (max-width: 768px)',
    Medium = '(min-width: 768px) and (max-width: 960px)',
    Large = '(min-width: 961px) and (max-width: 1200px)',
    XLarge = '(min-width: 1200px)',
}

const breakpoints: BreakpointType[] = ['xmall', 'small', 'medium', 'large', 'xlarge']
type BreakpointType = 'xmall' | 'small' | 'medium' | 'large' | 'xlarge'

export default function useViewport(): BreakpointType {
    const list = [
        useMatchMedia(Breakpoints.XSmall),
        useMatchMedia(Breakpoints.Small),
        useMatchMedia(Breakpoints.Medium),
        useMatchMedia(Breakpoints.Large),
        useMatchMedia(Breakpoints.XLarge), 
    ]
    
    const index = list.findIndex(Boolean)

    return breakpoints[index]
}