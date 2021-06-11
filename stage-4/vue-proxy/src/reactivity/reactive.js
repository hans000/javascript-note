import {isObject} from "../shared/utils.js";
import {mutableHandler} from "./baseHanlders.js";

// 防止同一对象被多次代理映射表
const toProxy = new WeakMap(); //  key=>原对象 , value=>被代理的对象
// 防止已经代理过的对象被多次代理映射表
const toRaw = new WeakMap();	// key=>被代理的对象  , value=>原对象

export function reactive (target) {
	// 创建一个响应式对象，目标对象有不同数据类型，array，object，set，map
	return createReactiveObject(target, mutableHandler);
}

// 创建一个响应式对象
function createReactiveObject (target, baseHandler) {
	// 监控对象，不是对象直接返回
	if (!isObject(target)) return target;

	// 如果对象已经被代理，直接返回被代理后的对象
	const proxy = toProxy.get(target);
	if (proxy) return proxy;

	// 如果对象已经代理过，防止代理过的对象再次代理
	if (toRaw.has(target)) return target;

	const observed = new Proxy(target, baseHandler);
	toProxy.set(target, observed);
	toRaw.set(observed, target);

	return observed;
}
