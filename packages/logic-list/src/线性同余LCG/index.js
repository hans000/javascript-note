

function LCG(min, max, seed) {
    const a = 0x5deece66d
    const c = 0xB
    const m = 1 << 29
    return () => {
        seed = (seed * a + c) % m
        const value = seed % (max - min) + min
        return value
    }
}

const rand = LCG(0, 21, 1)

console.log(Array.from({ length: 100 }, () => rand()));