export function isObject (val) {
	return typeof val === 'object' && val !== null;
}

export function hasOwnProperty (target,key) {
	return Object.prototype.hasOwnProperty.call(target,key);
}

export function hasChanged (newVal,oldVal) {
	return newVal !== oldVal;
}

export function isFunction (val) {
	return typeof val === 'function';
}
