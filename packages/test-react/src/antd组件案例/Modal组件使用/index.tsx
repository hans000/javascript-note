import React, { Component, useEffect } from 'react'
import MyModal, { ITableParams } from './ComplexModal'
import useModal from './03Hooks测试';
import { Button, Form } from 'antd';
// import { Modal } from 'antd';
import SimpleModal from './02简单测试';
import RefModal, { IPayload } from './01暴漏ref测试';

// export default () => {
//     const [Modal, { show }] = useModal({
//         onCancel:() => console.log('close'),
//         onOk: () => console.log('open'),
//     })

//     return (
//         <div>
//             <Button onClick={show}>click me</Button>
//             <Button onClick={show}>click me2</Button>
//             <Modal>
//                 waertyui
//             </Modal>
//         </div>
//     )
// }

// export default class index extends Component {
//     private modalRef = React.createRef<IPayload>();
//     private clickHandle = () => {
//         this.modalRef.current.show()
//     }
//     render() {
//         return (
//             <div>
//                 <Button onClick={this.clickHandle}>click me</Button>
//                 <RefModal onOk={() => console.log(2)} ref={this.modalRef}>
//                     12332
//                 </RefModal>
//             </div>
//         )
//     }
// }

export default class index extends Component {
    private ref = React.createRef()
    private id: string = '';
    private id2: string = '';

    private clickHandle = () => {
        this.id = SimpleModal.setup({
            onCancel: () => Math.random() + .6 > 1,
            id: this.id
            // render: () => '测试内容'
        })
    }
    private clickHandle2 = () => {
        this.id2 = SimpleModal.setup({
            onCancel: () => Math.random() + .6 > 1,
            id: this.id2
            // render: () => '测试内容2'
        })
    }
    render() {
        console.log(this.ref);
        
        return (
            <div>
                <Button onClick={this.clickHandle}>click me</Button>
                <Button onClick={this.clickHandle2}>click me2</Button>
                <SimpleModal>
                    测试内容
                </SimpleModal>
                <SimpleModal>
                    测试内容2
                </SimpleModal>
            </div>
        )
    }
}

// export default class index extends Component {

//     private showHandle = () => {
//         MyModal.setup({
//             reRequest: true,
//             multi: true,
//             onInputChange: console.log,
//             onOk: (data: any) => {
//                 console.log(data);
//             },
//             onShow: () => {
//                 console.log(123);
//             },
//             columns: [{dataIndex: 'id',title: 'ID'},{dataIndex: 'name', title: '标题'}],
//             machineData: (data) => {
//                 return data.map((e: any) => ({ id: e.id, name: e.name + '!' }))
//             },
//         })
//     }

//     private loadTreeData = () => {
//         return new Promise((resolve, reject) => {
//             try {
//                 setTimeout(() => {
//                     console.log('get treedata!');
//                     resolve([
//                         { key: 'a', title: 'a', disabled: true },
//                         { key: 'b', title: 'b' },
//                         { key: 'c', title: 'c' },
//                         { key: 'd', title: 'd' },
//                     ])
//                 }, 1000)
//             } catch (error) {
//                 reject(error)
//             }
//         })
//     }

//     private loadTableData = (params: Partial<ITableParams>) => {
//         return new Promise((resolve, reject) => {
//             try {
//                 setTimeout(() => {
//                     const { pageNum, pageSize, searchValue, treeSelectKey } = params
//                     resolve(Array.from({ length: pageSize }, (_, index: number) => ({
//                         id: (pageNum - 1) * pageSize + index + 1,
//                         name: `${searchValue}-${treeSelectKey}--${Math.random().toString(36).slice(3)}`,
//                     })))
//                 }, 1000)
//             } catch (error) {
//                 reject(error)
//             }
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.showHandle}>click me</button>
//                 <MyModal loadTreeData={this.loadTreeData} loadTableData={this.loadTableData} />
//             </div>
//         )
//     }
// }
