import {hasChanged, hasOwnProperty, isObject} from "../shared/utils.js";
import {reactive} from "./reactive.js";
import {track, trigger} from "./effect.js";
import {TractOpTypes, TriggerOpTypes} from "./operation.js";

const get = createGetter();
const set = createSetter();

// 拦截普通对象和数组
export const mutableHandler = {
	get,
	set
}

// 创建 get
function createGetter () {
	return function get (target, key, receiver) {
		// proxy + reflect
		const res = Reflect.get(target, key, receiver); // target[key]

		// 依赖收集
		track(target, TractOpTypes.GET, key);

		// 如果是对象，递归代理
		if ( isObject(res) ) return reactive(res);

		// console.log('获取属性的值：', 'target：', target, 'key：', key)

		return res;
	}
}

// 创建 set
function createSetter () {
	return function set (target, key, value, receiver) {
		// 需要判断修改属性还是新增属性，如果原始值于新设置的值一样，则不作处理
		const hasKey = hasOwnProperty(target, key);
		const oldVal = target[key];
		const res = Reflect.set(target, key, value, receiver);	// target[key]=value;
		// 属性新增
		if ( !hasKey ) {
			// console.log('新增了属性：', 'target：', target, 'key：', key, 'value：', value);
			// 触发依赖更新
			trigger(target, TriggerOpTypes.ADD, key, value, oldVal);
		} else if ( hasChanged(value, oldVal) ) {
			// 原始值于新设置的值不一样，修改属性
			// console.log('修改了属性：', 'target：', target, 'key：', key, 'value：', value)
			// 触发依赖更新
			trigger(target, TriggerOpTypes.SET, key, value, oldVal);
		}
		// 值未发生变化，不作处理
		return res;
	}
}
