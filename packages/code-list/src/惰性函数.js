/**
 * 惰性函数
 * 惰性载入表示函数执行的分支只会在函数第一次掉用的时候执行，在第一次调用过程中，
 * 该函数会被覆盖为另一个按照合适方式执行的函数，这样任何对原函数的调用就不用再经过执行的分支了。
 */

// 普通函数
function addEvent(type, element, fun) {
    if (element.addEventListener) {
        element.addEventListener(type, fun, false);
    } else if(element.attachEvent){
        element.attachEvent('on' + type, fun);
    } else{
        element['on' + type] = fun;
    }
}

// 使用覆盖当前函数方式实现
function addEvent(type, element, fun) {
    if (element.addEventListener) {
        addEvent = (type, element, fun) => element.addEventListener(type, fun, false);
    } else if (element.attachEvent) {
        addEvent = (type, element, fun) = element.attachEvent('on' + type, fun);
    } else {
        addEvent = (type, element, fun) => element['on' + type] = fun;
    }
}

// 使用IIFE方式实现
function addEvent(type, element, fun) {
    if (element.addEventListener) {
        element.addEventListener(type, fun, false);
    } else if(element.attachEvent){
        element.attachEvent('on' + type, fun);
    } else{
        element['on' + type] = fun;
    }
}
