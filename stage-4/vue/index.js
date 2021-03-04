
// =========================================================

let data = reactive({ name: 'Hello' });

effect(() => {
    console.log(data.name)
})

data.name = 'World';

// =========================================================

const isObject = target => target !== null && typeof target === 'object'
const hasOwnProperty = (target,key) => Object.prototype.hasOwnProperty.call(target,key)
const hasChanged = (oldVal, newVal) => oldVal === newVal
function effect(fn, options = {}) {
    // 创建响应式 effect
    const reactiveEffect = createReactiveEffect(fn, options);
    // 默认执行一次
    reactiveEffect()
}
function reactive(target) {
    // 类型检查
    if (!isObject(target)) return target

    const observed = new Proxy(target, {
        get(target, key, receiver) {
            // proxy + reflect
            const res = Reflect.get(target, key, receiver);  // target[key];
            // 如果是对象，递归代理
            if (isObject(res)) return reactive(res);
            console.log('获取属性的值：', 'target：', target, 'key：', key)
            return res;
        },
        set(target, key, value, receiver) {
            // 需要判断修改属性还是新增属性，如果原始值于新设置的值一样，则不作处理
            const has = hasOwnProperty(target, key);
            // 获取原始值
            const oldVal = target[key];
            const res = Reflect.set(target, key, value, receiver);    // target[key]=value;
            if (!has) { 
                // 新增属性
                console.log('新增了属性：', 'key：', key, 'value：', value);
            } else if (hasChanged(value, oldVal)) { 
                // 原始值于新设置的值不一样，修改属性值
                console.log('修改了属性：', 'key：', key, 'value：', value)
            }
            // 值未发生变化，不作处理
            return res;
        }
    })
    return observed
}