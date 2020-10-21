import { Input as AntdInput, Select } from "antd"
import React, { useCallback, useState } from "react"


class Input extends React.PureComponent<any, {}> {
    render() {
        console.log(1111);
        return <AntdInput {...this.props}></AntdInput>
    }
}

export default () => {
    const [store, setStore] = useState({ input: '', select: undefined })
    
    const inputChange = useCallback(
        function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
            event.persist()
            setStore(store => ({
                ...store,
                input: event.target.value
            }))
        },
        [],
    )
    const selectChange = useCallback(
        function selectChange(value: string) {
            setStore(store => ({
                ...store,
                select: value
            }))
        },
        [],
    )
    
    return (
        <div>
            <Input
                value={store.input}
                onChange={inputChange}
                 />
            <Select
                style={{ width: '100%' }}
                value={store.select}
                onSelect={selectChange}
                >
                <Select.Option value='A' key='A'>A</Select.Option>
                <Select.Option value='B' key='B'>B</Select.Option>
                <Select.Option value='C' key='C'>C</Select.Option>
            </Select>
        </div>
    )
}

// export default class extends React.Component<{}, { input: string, select: string }> {
//     constructor(props: IProps) {
//         super(props)
//         this.state = {
//             input: '',
//             select: undefined,
//         }
//         // this.inputChange = this.inputChange.bind(this)
//         // this.selectChange = this.selectChange.bind(this)
//     }
//     private inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         event.persist()
//         this.setState({
//             input: event.target.value
//         })
//     }
//     private selectChange = (value: string) => {
//         this.setState({
//             select: value
//         })
//     }
//     render() {
//         return (
//             <div>
//                 <Input
//                     value={this.state.input}
//                     onChange={this.inputChange}
//                     />
//                 <Input
//                     />
//                 <Select style={{ width: '100%' }}
//                     value={this.state.select}
//                     onSelect={this.selectChange}
//                     >
//                     <Select.Option value='A' key='A'>A</Select.Option>
//                     <Select.Option value='B' key='B'>B</Select.Option>
//                     <Select.Option value='C' key='C'>C</Select.Option>
//                 </Select>
//             </div>
//         )
//     }
// }