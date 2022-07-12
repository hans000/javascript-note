import { Vector } from "./type"

export function noop() { }

const Sqrt2 = Math.pow(2, .5)
const HalfSqrt2 = Sqrt2 / 2
const Sqrt3 = Math.pow(3, .5)
const HalfSqrt3 = Sqrt3 / 2

export type FadeType = 'cos' | 'fade' | 'ease' | 'line'

export function fade(v: number, type: FadeType = 'fade') {

    if (type === 'line') {
        // f(x) = x
        return v
    }

    if (type === 'cos') {
        // f(x) = 0.5 * (1-cos(πx))
        return 0.5 * (1 - Math.cos(Math.PI * v))
    }

    if (type === 'ease') {
        // f(x) = 3x^2 - 2x^3
        return 3 * v ** 2 - 2 * v ** 3
    }

    // f(x) = 6x^5 - 15x^4 + 10x^3
    return v * v * v * (v * (6 * v - 15) + 10)

}

export const Permutation = [151,160,137,91,90,15, 131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33, 88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166, 77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244, 102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196, 135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123, 5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42, 223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9, 129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228, 251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107, 49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254, 138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]

export function perlin1(x: number, type: FadeType = 'fade') {
    const x1 = x | 0
    const f = x - x1
    
    const Len = Permutation.length
    const grad1 = Permutation[x1 % Len]
    const grad2 = Permutation[(x1 + 1) % Len]

    return mix(grad1, grad2, fade(f, type))
}

const octavePerm: Array<[number, number]> = [
    [1, 0],
    [HalfSqrt2, HalfSqrt2],
    [0, 1],
    [-HalfSqrt2, HalfSqrt2],
    [-1, 0],
    [-HalfSqrt2, HalfSqrt2],
    [0, -1],
    [HalfSqrt2, -HalfSqrt2],
]

const HexPerm: Array<[number, number, number]> = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [0, 1, 1],
    [0, -1, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, -1],
    [0, -1, -1],

    // [1, 1, 0],
    // [0, -1, 1],
    // [-1, 1, 0],
    // [0, -1, -1],
]

/**
 * |————1————2————>x
 * |    |    |
 * |————4————3————
 * |
 * y
 */
export function perlin2(x: number, y: number) {
    const x1 = x | 0
    const y1 = y | 0
    const fx = x - x1
    const fy = y - y1

    const grad1 = octavePerm[getOctaveIndex(x1, y1)]
    const grad2 = octavePerm[getOctaveIndex(x1 + 1, y1)]
    const grad3 = octavePerm[getOctaveIndex(x1 + 1, y1 + 1)]
    const grad4 = octavePerm[getOctaveIndex(x1, y1 + 1)]

    // const noise1 = rand(x1, y1) // dot(grad1, [fx, fy])
    // const noise2 = rand(x1 + 1, y1) // dot(grad2, [fx - 1, fy])
    // const noise3 = rand(x1 + 1, y1 + 1) // dot(grad3, [fx, fy - 1])
    // const noise4 = rand(x1, y1 + 1) // dot(grad4, [fx - 1, fy - 1])

    const normalize = (v: number) => (v + Sqrt2) / Sqrt2 / 2

    const noise1 = normalize(dot(grad1, [fx, fy]))
    const noise2 = normalize(dot(grad2, [fx - 1, fy]))
    const noise3 = normalize(dot(grad3, [fx - 1, fy - 1]))
    const noise4 = normalize(dot(grad4, [fx, fy - 1]))

    return mix(
        mix(noise1, noise2, fade(fx)),
        mix(noise4, noise3, fade(fx)),
        fade(fy)
    )
}

export function perlin3(x: number, y: number, z: number) {
    const x1 = x | 0
    const y1 = y | 0
    const z1 = z | 0
    const fx = x - x1
    const fy = y - y1
    const fz = z - z1

    const grad1 = HexPerm[getHexIndex(x1, y1, z1)]
    const grad2 = HexPerm[getHexIndex(x1 + 1, y1, z1)]
    const grad3 = HexPerm[getHexIndex(x1 + 1, y1 + 1, z1)]
    const grad4 = HexPerm[getHexIndex(x1, y1 + 1, z1)]
    const grad5 = HexPerm[getHexIndex(x1, y1, z1 + 1)]
    const grad6 = HexPerm[getHexIndex(x1 + 1, y1, z1 + 1)]
    const grad7 = HexPerm[getHexIndex(x1 + 1, y1 + 1, z1 + 1)]
    const grad8 = HexPerm[getHexIndex(x1, y1 + 1, z1 + 1)]

    const normalize = (v: number) => (v + Sqrt3) / Sqrt3 / 2

    const noise1 = normalize(dot(grad1, [fx, fy, fz]))
    const noise2 = normalize(dot(grad2, [fx - 1, fy, fz]))
    const noise3 = normalize(dot(grad3, [fx - 1, fy - 1, fz]))
    const noise4 = normalize(dot(grad4, [fx, fy - 1, fz]))
    const noise5 = normalize(dot(grad5, [fx, fy, fz - 1]))
    const noise6 = normalize(dot(grad6, [fx - 1, fy, fz - 1]))
    const noise7 = normalize(dot(grad7, [fx - 1, fy - 1, fz - 1]))
    const noise8 = normalize(dot(grad8, [fx, fy - 1, fz - 1]))

    return mix(
        mix(
            mix(noise1, noise2, fade(fx)),
            mix(noise4, noise3, fade(fx)),
            fade(fy)
        ),
        mix(
            mix(noise5, noise6, fade(fx)),
            mix(noise8, noise7, fade(fx)),
            fade(fy)
        ),
        fz
    )
}

export function rand(x: number, y: number) {
    const p = Permutation
    const pl = p.length
    return p[(x + p[y % pl]) % pl]
}

export function getOctaveIndex(x: number, y: number) {
    const p = Permutation
    const pl = p.length
    const ol = octavePerm.length
    return p[(x + p[y % pl]) % pl] % ol
}
export function getHexIndex(x: number, y: number, z: number) {
    const p = Permutation
    const pl = p.length
    const ol = HexPerm.length
    return p[(x + p[(y + p[z % pl]) % pl]) % pl] % ol
}

export function mix(v1: number, v2: number, weight: number) {
    return v1 + weight * (v2 - v1)
}

export function dot(v1: Vector, v2: Vector) {
    return v1.reduce((acc, v, i) => acc += v * v2[i], 0)
}

export function fract(v: number) {
    return v - Math.floor(v)
}

export function hash11(v: number) {
    v = fract(v * .1031)
    v *= v + 33.33
    v *= v + v
    return fract(v)
}

/**
 * 线性同余生成器
 * rand_seed = (rand_seed * A + C) % M
 * LCG的周期最大为 M，但大部分情况都会少于M。要令LCG达到最大周期要满足
 * - C, M互质
 * - M 的所有质因数都能整除A-1
 * - 若 M 是4的倍数，A-1也是
 * - A, C 都比M小
 * - A, C 是正整数
 */
export function lcg(seed = Math.random()) {
    let Z = seed                // 随机种子
    const A = 0x5deece6d        // 乘数
    const C = 0xb               // 增数
    const M = 1 << 48           // 模数

    return (seed: number) => {
        if (seed != null) {
            Z = seed
        }
        Z = (Z * A + C) % M / M //做归一化处理
        return Z
    }
}


export function perlinNois2(x: number, y: number) {
    const x1 = x | 0
    const y1 = y | 0
    const fx = x - x1
    const fy = y - y1

    const calc = (hash: number = 0, x: number, y: number) => {
        const v = (hash & 1) === 0 ? x : y;
        return (hash & 2) === 0 ? -v : v
    }

    const getHash = (x: number, y: number) => {
        const p = Permutation
        const pl = p.length
        return p[(x + p[y % pl]) % pl]
    }

    const noise1 = calc(getHash(x1, y1),            fx,     fy)
    const noise2 = calc(getHash(x1 + 1, y1),        fx - 1, fy)
    const noise3 = calc(getHash(x1 + 1, y1 + 1),    fx - 1, fy - 1)
    const noise4 = calc(getHash(x1, y1 + 1),        fx,     fy - 1)

    return (mix(
        mix(noise1, noise2, fade(fx)),
        mix(noise4, noise3, fade(fx)),
        fade(fy)
    ) + 1) / 2
}

export function perlinNoise3(x: number, y: number, z: number) {
    const x1 = x | 0
    const y1 = y | 0
    const z1 = z | 0
    const fx = x - x1
    const fy = y - y1
    const fz = z - z1

    const calc = (hash: number = 0, x: number, y: number, z: number) => {
        const ol = HexPerm.length
        const h = hash % ol // 这里按12个梯度向量处理
        switch(h & 0xB) {
            case 0x0: return  x + y;
            case 0x1: return -x + y;
            case 0x2: return  x - y;
            case 0x3: return -x - y;
            case 0x4: return  x + z;
            case 0x5: return -x + z;
            case 0x6: return  x - z;
            case 0x7: return -x - z;
            case 0x8: return  y + z;
            case 0x9: return -y + z;
            case 0xA: return  y - z;
            case 0xB: return -y - z;
            // case 0xC: return  y + x;
            // case 0xD: return -y + z;
            // case 0xE: return  y - x;
            // case 0xF: return -y - z;
            default: return 0; // never happens
        }
        // const list = [
        //     () =>  x - y,
        //     () => -x + y,
        //     () =>  x - z,
        //     () => -x + z,
        //     () =>  y - z,
        //     () => -y + z,
        //     () =>  x - y,
        //     () => -x + y,
        //     () =>  x - z,
        //     () => -x + z,
        //     () =>  y - z,
        //     () => -y + z,
        // ]
        // return list[h]()
    }

    const getHash = (x: number, y: number, z: number) => {
        const p = Permutation
        const pl = p.length
        return p[(x + p[(y + p[z % pl]) % pl]) % pl]
    }

    const noise1 = calc(getHash(x1, y1, z1), fx, fy, fz)
    const noise2 = calc(getHash(x1 + 1, y1, z1), fx - 1, fy, fz)
    const noise3 = calc(getHash(x1 + 1, y1 + 1, z1), fx - 1, fy - 1, fz)
    const noise4 = calc(getHash(x1, y1 + 1, z1), fx, fy - 1, fz)
    const noise5 = calc(getHash(x1, y1, z1 + 1), fx, fy, fz - 1)
    const noise6 = calc(getHash(x1 + 1, y1, z1 + 1), fx - 1, fy, fz - 1)
    const noise7 = calc(getHash(x1 + 1, y1 + 1, z1 + 1), fx - 1, fy - 1, fz - 1)
    const noise8 = calc(getHash(x1, y1 + 1, z1 + 1), fx, fy - 1, fz - 1)

    return mix(
        mix(
            mix(noise1, noise2, fade(fx)),
            mix(noise4, noise3, fade(fx)),
            fade(fy)
        ),
        mix(
            mix(noise5, noise6, fade(fx)),
            mix(noise8, noise7, fade(fx)),
            fade(fy)
        ),
        fz
    )
}