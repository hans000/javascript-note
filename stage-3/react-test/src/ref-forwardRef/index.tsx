import React, { MutableRefObject } from "react";

/**
 * 绑定ref属性的三种方式
 * 1. 使用字符串绑定ref属性，同种this.refs.xx使用，强烈不推荐使用
 * 2. 通过回调函数绑定，{ ref => this.myRef = ref }, 繁琐，不推荐使用
 * 3. 通过React.createRef绑定，在current属性，推荐
 * 
 * 函数组件没有实例，因此没有this，无法绑定ref，但可以通过forwardRef向下传递ref
 */
const ChildWrap = React.forwardRef((_, ref) => {
    return <Child myRef={ref as MutableRefObject<HTMLDivElement>}/>
})

export default class extends React.Component {
    private childRef = React.createRef()
    private classChildRef: ClassChild = null;
    private classChildRef3: ClassChild = null;
    private classChildRef2 = React.createRef<ClassChild>();

    private print = () => {
        console.log(this.childRef, this.classChildRef, this.classChildRef2, this.classChildRef3);
        
    }
    public render() {
        return (
            <div>
                <button onClick={this.print}>click me</button>
                <ChildWrap ref={this.childRef}/>
                <ClassChild ref={(ref) => this.classChildRef = ref}/>
                <ClassChild ref={(ref) => this.classChildRef3 = ref}/>
                <ClassChild ref={this.classChildRef2}/>
            </div>
        )
    }
}
class ClassChild extends React.Component {
    public childFn() {
        console.log('children fn');
    }
    public render() {
        return (
            <div>
                <h2>Class child</h2>
            </div>
        )
    }
}
function Child(props: { myRef: MutableRefObject<HTMLDivElement>}) {
    function childFn() {
        console.log('children fn');
    }
    return (
        <div ref={props.myRef}>
            <h2>child</h2>
        </div>
    )
}