import React, { useEffect, useState, memo, useCallback, useReducer, useRef, useLayoutEffect } from "react"

// function Child(props: {
//     fetchData: () => void
//     query: string
//     title?: string
// }) {
//     console.log(props.title, 'Child 渲染了');
    
//     useEffect(
//         () => {
//             props.fetchData()
//         }, 
//         [props.fetchData, props.query]
//     )
//     return (
//         <div><hr/>
//             <h3>{props.title}子组件</h3>
//             <p>{props.query}</p>
//         </div>
//     )
// }

// interface IState {
//     query: string
// }
// interface IAction {
//     type: string
//     payload: any
// }
// const defaultState: IState = {
//     query: '',
// }

// function Parent(props: {
//     count: number
//     title?: string
// }) {
//     console.log(props.title, 'Parent 渲染了');
//     const [query, setQuery] = useState('');

//     const [state, dispatch] = useReducer(
//         (state: IState, action: IAction) => {
//             if (action.type === 'setQuery') {
//                 return {
//                     ...state,
//                     query: action.payload,
//                 }
//             }
//             if (action.type === 'fetchData') {
//                 Promise.resolve().then(res => {
//                     return {
//                         ...state,

//                     }
//                 })
//             }
//             return {
//                 ...state,
//             }
//         }, 
//         defaultState
//     )

//     // const change = (e: any) => {
//     //     setQuery(e.target.value)
//     // }
//     // const fetchData = useCallback(() => {
//     //     console.log(query);
//     // }, [query])

//     return (
//         <div><hr/>
//             <h3>{props.title}父组件 - {props.count}</h3>
//             <input onChange={(e) => dispatch({ type: 'setQuery', payload: e.target.value })} value={query} />
//             {/* <Child fetchData={fetchData} query={query} /> */}
//             {/* <MemoChild fetchData={fetchData} query={query} /> */}
//         </div>
//     )
// }

// const MemoChild = memo(Child)
// const MemoParent = memo(Parent)

// export default () => {
//     console.log('Index 渲染了');
//     const [count, setCount] = useState(0)
//     const click = useCallback(() => setCount(c => c + 1), [])
//     return (
//         <div><hr/>
//             <h3>入口{count}</h3>
//             <button onClick={click}>click</button>
//             {/* <Parent count={count}/> */}
//             <MemoParent count={count}/>
//         </div>
//     )
// }

// const Child = React.memo(function({val, onChange}: any) {
//     console.log('render...');
//     return <input value={val} onChange={onChange} />;
// });
  
// export default function App() {
//     const [val1, setVal1] = useState('');
//     const [val2, setVal2] = useState('');
  
//     const onChange1 = useCallback( evt => {
//       setVal1(evt.target.value);
//     }, []);
  
//     const onChange2 = useCallback(evt => {
//       setVal2(evt.target.value);
//     }, []);
  
//     return (
//     <>
//       <Child val={val1} onChange={onChange1} />
//       <Child val={val2} onChange={onChange2} />
//     </>
//     );
// }

function namedMemo<T extends React.ComponentType<any>>(Comp: T, displayName: string) {
    Comp.displayName = displayName
    return memo(Comp)
}

const HeavyComponent = (props: any) => {
    const [text, setText] = useState('')
    console.log('HeavyComponent render');
    const handleClick = () => {
        console.log('btn', props.onSubmit());
        setText(props.onSubmit())
    }
    const memoHandleClick = useCallback(handleClick, [])
    return (
        <div>
            <button onClick={memoHandleClick}>click</button>
            <p>{text}</p>
        </div>
    )
}
const MemoHeavyComponent = memo(HeavyComponent)

function useRefCallback<T extends (...args: any[]) => any>(fn: T, dependencies: any[]) {
    const ref = useRef<T>(fn)
    // 每次调用的时候，fn 都是一个全新的函数，函数中的变量有自己的作用域
    // 当依赖改变的时候，传入的 fn 中的依赖值也会更新，这时更新 ref 的指向为新传入的 fn
    useEffect(() => (ref.current = fn), [fn, ...dependencies])

    return useCallback(() => ref.current(), [ref]) as T
}

export default function Form() {
    const [text, updateText] = useState('');
    const handleSubmit = useRefCallback(() => text, [text])
  
    return (
      <>
        <input value={text} onChange={(e) => updateText(e.target.value)} />
        <MemoHeavyComponent onSubmit={handleSubmit} />
        {/* <HeavyComponent onSubmit={handleSubmit} />  */}
        {/* // 很重的组件，不优化会死的那种 */}
      </>
    );
}

// export default function Form() {
//     const [text, updateText] = useState('');
//     const textRef = useRef('')

//     useEffect(() => {
//         textRef.current = text
//     }, [text])

//     const handleSubmit = useCallback(() => {
//     //   console.log(textRef.current);
//       return textRef.current
//     }, [textRef]);
//     // 每次 text 变化时 handleSubmit 都会变
  
//     return (
//       <>
//         <input value={text} onChange={(e) => updateText(e.target.value)} />
//         <HeavyComponent onSubmit={handleSubmit} /> 
//         {/* // 很重的组件，不优化会死的那种 */}
//       </>
//     );
// }