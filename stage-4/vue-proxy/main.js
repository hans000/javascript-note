import {effect, reactive,computed} from "./src/reactivity/index.js";

// proxy


const state = reactive({
	count: 1,
	age: 18,
});


effect(()=>{
	state.count++
	// console.log(state.count)
})
// effect(()=>{
// 	console.log(state.age)
// })
// state.count++
// console.log();


// const state = reactive({ name: 'chris', age: 23, arr: [1, 2, 3] });


// 调用 push 方法，会先新增一个值，然后修改length，会导致触发两次
// state.arr.length;
// state.arr.push(4);

// effect(() => {
// 	console.log('*********effect**********', state.name);
// })
//
// state.name = 'Jack';


// effect(() => {
// 	console.log('*********effect**********', JSON.stringify(state.arr))
// })

// state.arr.push(4)

// let myAge = computed(()=>{
// 	console.log('ok')
// 	return state.age * 2
// })


// file(() => {

// })
// file(() => {
	
	
// })