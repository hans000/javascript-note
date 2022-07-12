import React from "react"

/**
 * props.children属性
 * 当标签内是文本时，原样输出
 * 当标签内是一个时，为对象
 * 当标签内是数据大于1时，为数组
 * 有时这种设定会很麻烦，因此react提供了转化的api，React.toArray
 */

export default function() {
    return (
        <div>
            <Child>
                1
                2
                3
            </Child>
            <Child>
                <button>a</button>
            </Child>
            <Child>
                <button>a</button>
                <button>b</button>
            </Child>
            <Child>
                <React.Fragment>
                    <button>a</button>
                    <button>b</button>
                </React.Fragment>
            </Child>
        </div>
    )
}

class Child extends React.Component {
    public componentDidMount() {
        console.log(React.Children.toArray(this.props.children));
        
    }
    public render() {
        return (
            <div>
                Child
            </div>
        )
    }
}