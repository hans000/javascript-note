const foo = {
    data: data
}
const data = {
    list: [
        {
            foo: 1,
            baz: true,
        }
    ],
    object: {
        foo: 1
    },
    foo: 1,
    baz: true
}
/**
 * 递归拷贝
 * 这里使用了reduce，超级好用的api
 * @param data 数据源
 */
function copy(data, cache = []) {
    if (Array.isArray(data)) {
        return data.reduce((r, v) => {
            r.push(typeof v === 'object' ? copy(v) : v)
            return r
        }, [])
    }
    if (typeof data === 'object') {
        return Object.entries(data).reduce((r, [k, v]) => {
            if (cache.includes(v)) {
                r[k] = v
                return r
            }
            r[k] = typeof data[k] === 'object' ? copy(v, cache) : v
            cache.push(v)
            return r
        }, {})
    }
    return data
}
// const copy = source => {
//     if (!getType(source)) {
//         return source;
//     }
//     let dest = Array.isArray(source) ? [] : {};
//     const queue = [{ source, dest }];
//     const set = new Set([]);

//     while (queue.length) {
//         const { dest, source } = queue.shift();
//         const type = getType(source);
//         if (type === "Array") {
//             source.forEach((x, index) => {
//                 const xType = getType(x);
//                 if (!xType) {
//                     dest[index] = x;
//                     return;
//                 }

//                 if (xType === "Array") {
//                     dest[index] = [];
//                     queue.push({
//                         source: x,
//                         dest: dest[index]
//                     });
//                     return;
//                 }

//                 if (xType === "Object") {
//                     if (set.has(x)) {
//                         dest[index] = x;
//                         return;
//                     }
//                     dest[index] = {};
//                     queue.push({
//                         source: x,
//                         dest: dest[index]
//                     });
//                     return;
//                 }
//             });
//         } else {
//             // 对象
//             for (let [k, v] of Object.entries(source)) {
//                 const vType = getType(v);
//                 if (!vType) {
//                     dest[k] = v;
//                     continue;
//                 }
//                 if (vType === "Array") {
//                     dest[k] = [];
//                     queue.push({
//                         source: v,
//                         dest: dest[k]
//                     });
//                 }
//                 if (vType === "Object") {
//                     if (set.has(v)) {
//                         dest[k] = v;
//                         continue;
//                     }
//                     dest[k] = {};
//                     queue.push({
//                         source: v,
//                         dest: dest[k]
//                     });
//                 }
//             }
//         }
//         set.add(source);
//     }
//     return dest;
// };

console.log(copy(111));
console.log(copy(true));
const list = [1, 2, 3]
console.log(copy(list), copy(list) === list);
const obj = { foo: 1, bar: true, baz: [1, 2, 3] }
console.log(copy(obj), copy(obj) === obj);

console.log('end');

// 深拷贝对象
function deepClone(obj) {
    const _toString = Object.prototype.toString
  
    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
      return obj
    }
  
    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
      return obj.cloneNode(true)
    }
  
    // Date
    if (_toString.call(obj) === '[object Date]') {
      return new Date(obj.getTime())
    }
  
    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
      const flags = []
      if (obj.global) { flags.push('g') }
      if (obj.multiline) { flags.push('m') }
      if (obj.ignoreCase) { flags.push('i') }
  
      return new RegExp(obj.source, flags.join(''))
    }
  
    const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}
  
    for (const key in obj) {
      result[key] = deepClone(obj[key])
    }
  
    return result
}
  