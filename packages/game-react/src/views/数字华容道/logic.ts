export const ROW = 4;
const BLANK_NUMBER = ROW ** 2 // 代表空白的数字

function valid(data: number[]) {
    let count = 0;
    mergeSort(data, count);
    return count % 2 === 0;
}
function merge(left: number[], right: number[], count: number) {
    const tmp = [];
    while (left.length && right.length) {
        if (left[0] > right[0]) {
            tmp.push(left.shift());
            count++;
        } else {
            tmp.push(right.shift());
        }
    }
    return tmp.concat(left, right);
}
function mergeSort(arr: number[], count: number): number[] {
    const len = arr.length;
    if (len === 1) return arr;
    const mid = len / 2 | 0;
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left, count), mergeSort(right, count), count);
}
function shuffle(data: number[]) {
    let len = data.length;
    for (let i = 0; i < len; i++) {
        let m = Math.random() * (len - i) | 0;
        [data[len - i - 1], data[m]] = [data[m], data[len - i - 1]];
    }
    return data;
}
export function exchange(data: number[], index: number) {
    const newData = [...data]
    const offset = [-1, 0, 0, 1, 1, 0, 0, -1]
    for (let i = 0; i < offset.length; i+=2) {
        const oy = offset[i];
        const ox = offset[i + 1];
        const newIndex = index + oy * ROW + ox;
        if (newData[newIndex] === BLANK_NUMBER) {
            [newData[newIndex], newData[index]] = [newData[index], newData[newIndex]]
            break
        } 
    }
    return newData
}
export function clear() {
    return Array.from({ length: ROW ** 2 }, (_, i) => i + 1);
}
export function initData() {
    const data = clear();
    while (1) {
        shuffle(data);
        if (valid(data)) {
            break;
        }
    }
    return data
}