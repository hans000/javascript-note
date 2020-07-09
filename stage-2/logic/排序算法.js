const data = [3, 6, 1, 4, 5, 2, 8, 7]

/**
 * 冒泡排序
 * 思想：俩俩比较，大的放后面，遍历此操作
 */
function bubbleSort(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - i; j++) {
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]]
            }
        }
    }
}
/**
 * 插入排序
 * 思想：把后续的元素插入有序的数组中
 */
function insertSort(data) {
    for (let i = 1; i < data.length; i++) {
        for (let j = 0; j < i; j++) {
            if (data[j] > data[i]) {
                [data[j], data[i]] = [data[i], data[j]]
            }
        }
    }
}
/**
 * 选择排序
 * 思想：遍历选出最大的值，放在最后
 */
function selectSort(data) {
    for (let i = 0; i < data.length - 1; i++) {
        let max = 0
        for (let j = 0; j < data.length - i; j++) {
            if (data[j] > data[max]) {
                max = j
            }
        }
        [data[data.length - i - 1], data[max]] = [data[max], data[data.length - i - 1]]
    }
}
/**
 * 快速排序
 * 思想：取数组最后一位说为基准，遍历数组，小于基准的放左边，大于基准的放右边
 */
function quickSort(data, start = 0, end = data.length - 1) {
    if (start >= end) {
        return
    }
    let i = start, j = end
    const baseVal = data[j]
    while (i < j) {
        while (data[i] <= baseVal && i < j) {
            i++
        }
        [data[j], data[i]] = [data[i], data[j]]
        while (data[j] >= baseVal && i < j) {
            j--
        }
        [data[j], data[i]] = [data[i], data[j]]
    }
    data[j] = baseVal
    quickSort(data, start, j - 1)
    quickSort(data, j + 1, end)
}

// bubbleSort(data)
// insertSort(data)
// selectSort(data)
quickSort(data)

console.log(data);
