import {TriggerOpTypes} from "./operation.js";

export function effect (fn, options = { lazy: false }) {
	// 创建响应式 effect
	const reactiveEffect = createReactiveEffect(fn, options);

	if ( !options.lazy ) {
		// 默认执行
		reactiveEffect();
	}

	return reactiveEffect;
}

//
let uid = 0;
let activeEffect;
const effectStack = [];

function createReactiveEffect (fn, options) {
	// 创建 响应式 effect
	const reactiveEffect = function () {
		// 防止不停更改属性导致死循环
		if ( !effectStack.includes(reactiveEffect) ) {
			try {
				effectStack.push(reactiveEffect);
				activeEffect = reactiveEffect;		// 将当前 effect 存储到 activeEffect
				return fn();
			} finally {
				// 执行完清空
				effectStack.pop();
				activeEffect = effectStack[effectStack.length - 1];
			}
		}
	}

	reactiveEffect.options = options;	// effect 的配置信息
	reactiveEffect.id = uid++;	// effect 的id
	reactiveEffect.deps = []; 	// 依赖，触发更新的属性

	return reactiveEffect;
}

const targetMap = new WeakMap();

export function track (target, type, key) {
	if ( activeEffect === undefined ) {
		return; // 说明取值的属性，不依赖于 effect
	}
	// 取值
	let depsMap = targetMap.get(target);
	// 不存在构建
	if (!depsMap) {
		targetMap.set(target, (depsMap = new Map()));
	}
	let dep = depsMap.get(key);
	if (!dep) {
		depsMap.set(key, (dep = new Set()));
	}
	if (!dep.has(activeEffect)) {
		dep.add(activeEffect);
		activeEffect.deps.push(dep);  // 当前 effect 记录 dep
	}
}

export function trigger (target, type, key, value, oldVal) {
	const depsMap = targetMap.get(target);
	// 没有依赖收集，直接返回
	if ( !depsMap ) return;

	// 计算属性优先于 effect
	const effects = new Set();
	const computedRunners = new Set();

	const add = (effectsToAdd)=>{
		if( effectsToAdd ){
			effectsToAdd.forEach(effect=>{
				if(effect.options.computed){
					computedRunners.add(effect)
				}else{
					effects.add(effect)
				}
			})
		}
	}

	const run = (effect) => {
		if ( effect.options.scheduler ) {
			effect.options.scheduler()
		}else{
			effect()
		}
	}

	if ( key !== null ) {
		add(depsMap.get(key));
	}

	if ( type === TriggerOpTypes.ADD ) { // 对数组新增熟悉会触发 length 对应的依赖
		debugger
		let effects = depsMap.get(Array.isArray(target) ? 'length' : '');
		add(effects);
	}

	computedRunners.forEach(run);
	effects.forEach(run);
}
