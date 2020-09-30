import { Modal, Input, Tree, Table, Icon, Button } from "antd";
import { useState, useRef, useEffect, useReducer, useCallback } from "react";
import React from "react";
import './index.css'
import { ColumnProps } from "antd/lib/table";


interface IHandle {
    onOk?: (data: any) => boolean | void;
    onCancel?: () => boolean;
    onShow?: () => void;
    onInputChange?: (value: string) => void;
    machineData?: (data: any) => any[];
    rowKey?: string;
    columns?: ColumnProps<unknown>[];
    reRequest?: boolean;
    multi?: boolean;
}
export interface ITableParams {
    searchValue: string;
    treeSelectKey: string;
    pageNum: number;
    pageSize: number;
}
interface IProps {
    loadTreeData: () => Promise<any>
    loadTableData: (params: Partial<ITableParams>) => Promise<any>
}

MyModal.setup = (_payload?: IHandle) => {};

interface IStore {
    tableData: any;
    treeData: any;
    searchValue: string;
    inputValue: string;
    selectedRowKeys: string[];
    selectedRows: any;
    selectedKeys: string[];
    total: number;
    pageNum: number;
    pageSize: number;
}

interface IAction {
    type: string;
    payload?: any;
}
const defaultStore: IStore = {
    tableData: [],
    treeData: [],
    searchValue: '',
    inputValue: '',
    selectedRowKeys: [],
    selectedRows: [],
    selectedKeys: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
}

function storeReducer(state: IStore, action: IAction): IStore {
    switch (action.type) {
        case 'reset':
            return {
                ...defaultStore,
                treeData: state.treeData
            };
        case 'setInputValue':
            return {
                ...state,
                inputValue: action.payload
            };
        case 'setSearchValue':
            return {
                ...state,
                searchValue: action.payload
            };
        case 'setTableData':
            return {
                ...state,
                tableData: action.payload
            };
        case 'selectChange':
            return {
                ...state,
                selectedRowKeys: action.payload.selectedRowKeys,
                selectedRows: action.payload.selectedRows,
            };
        case 'setTotal':
            return {
                ...state,
                total: action.payload
            };
        case 'updatePage':
            return {
                ...state,
                pageNum: action.payload.pageNum,
                pageSize: action.payload.pageSize,
            };
        case 'treeSelect':
            return {
                ...state,
                selectedKeys: action.payload,
            };
        case 'setTreeData':
            return {
                ...state,
                treeData: action.payload,
            }
        default:
            return state;
    }
}

export default function MyModal(props: IProps) {
    
    const handleRef = useRef<IHandle>({});
    const isFirst = useRef(true);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [store, storeDispatch] = useReducer(storeReducer, defaultStore)


    useEffect(() => {
        const lastInst = MyModal.setup
        MyModal.setup = (payload: IHandle = {}) => {
            setVisible(true)
            if (payload.onShow) {
                payload.onShow()
            }
            if (payload.reRequest || isFirst.current) {
                reqTreeData()
            }
            isFirst.current = false
            handleRef.current = {
                columns: [{dataIndex: 'id',title: 'id'}, {dataIndex: 'name', title: 'title'}],
                ...payload,
            }
        }
        return () => {
            MyModal.setup = lastInst
        }
    }, [])

    const onCancelHandle = (method?: () => boolean) => () => {
        const flag = method && method();
        !flag && setVisible(false);
        storeDispatch({ type: 'reset' })
    };

    const onOkHandle = (method?: (data: any) => boolean | void) => () => {
        const flag = method && method(store);
        !flag && setVisible(false);
        storeDispatch({ type: 'reset' })
    };

    const searchChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        storeDispatch({
            type: 'setSearchValue',
            payload: event.target.value
        })
    }

    const inputChangeHandle = (method?: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist()
        method && method(event.target.value);
        storeDispatch({
            type: 'setInputValue',
            payload: event.target.value
        })
    }

    const searchClick = () => {
        reqListData({
            pageNum: store.pageNum,
            pageSize: store.pageSize,
        })
    }
    
    const clearClick = () => {
        storeDispatch({ type: 'reset' })
    }

    const reqListData = (params: Partial<ITableParams>) => {
        setLoading(true)
        props.loadTableData({
            searchValue: store.searchValue,
            treeSelectKey: store.selectedKeys[0],
            ...params,
        }).then((data) => {
            storeDispatch({
                type: 'setTableData',
                payload: handleRef.current.machineData
                    ? handleRef.current.machineData(data)
                    : data
            })
            setLoading(false)
            storeDispatch({ type: 'setTotal', payload: 100 })
        }).catch(() => {
            setLoading(false)
        })
    }

    const reqTreeData = () => {
        props.loadTreeData().then((data) => {
            storeDispatch({
                type: 'setTreeData',
                payload: data
            })
        }).catch(() => {
            setLoading(false)
        })
    }

    const selectChange = (selectedRowKeys: string[] | number[], selectedRows: any) => {
        if (!handleRef.current.multi && selectedRowKeys.length === 2) {
            const index = store.selectedKeys[0] === selectedRowKeys[0] ? 1 : 0
            selectedRows.splice(index, 1)
            selectedRowKeys.splice(index, 1)
        }
        storeDispatch({
            type: 'selectChange',
            payload: {
                selectedRowKeys,
                selectedRows,
            }
        })
    }

    const updatePage = (pageNum: number, pageSize: number) => {
        storeDispatch({
            type: 'updatePage',
            payload: {
                pageNum,
                pageSize
            }
        })
        reqListData({ pageNum, pageSize })
    }

    const treeSelectChange = (selectedKeys: string[]) => {
        storeDispatch({
            type: 'treeSelect',
            payload: selectedKeys,
        })
        reqListData({
            treeSelectKey: selectedKeys[0],
            pageNum: store.pageNum,
            pageSize: store.pageSize,
        })
    }

    return (
        <Modal
            title='标题'
            okText='确定'
            cancelText='取消'
            className={handleRef.current.multi ? 'hr-modal' : 'hr-modal hr-modal--single'}
            visible={visible}
            onOk={onOkHandle(handleRef.current.onOk)}
            onCancel={onCancelHandle(handleRef.current.onCancel)}
            width={800}
            >
            <div className="hr-modal__wrap">
                <div className="hr-modal__left">
                    <Input value={store.inputValue} placeholder='请输入' onChange={inputChangeHandle(handleRef.current.onInputChange)} />
                    <Tree treeData={store.treeData} onSelect={treeSelectChange} />
                </div>
                <div className="hr-modal__right">
                <div>
                    <Input value={store.searchValue} placeholder='请输入' style={{ width: 200 }} onChange={searchChangeHandle} />
                    <Button onClick={searchClick}><Icon type='search' /></Button>
                    <Button onClick={clearClick}><Icon type='close' /></Button>
                </div>
                <Table
                    size='middle'
                    rowKey={handleRef.current.rowKey ? handleRef.current.rowKey : 'id' }
                    loading={loading}
                    scroll={{ y: 260 }}
                    pagination={{
                        current: store.pageNum,
                        total: store.total,
                        onChange: updatePage,
                        onShowSizeChange: updatePage,
                        pageSizeOptions: ['10', '20', '30', '50'],
                        showSizeChanger: true,
                    }}
                    rowSelection={{
                        selectedRowKeys: store.selectedRowKeys,
                        onChange: selectChange
                    }}
                    columns={handleRef.current.columns}
                    dataSource={store.tableData} />
            </div>
            </div>
        </Modal>
    )
}