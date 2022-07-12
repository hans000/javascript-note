import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface ITablePage {
    pageNum: number;
    pageSize: number
}

interface IPagination {
    total: number;
    showQuickJumper: boolean;
    showSizeChanger: boolean;
    current: number;
    pageSize: number;
    onChange: (pageNum: number, pageSize?: number) => void;
    onShowSizeChange: (pageNum: number, pageSize?: number) => void;
    pageSizeOptions: string[];
}

export default function useTableRequest<T extends ITablePage>(api: (params: T) => Promise<any>): {
    list: any[];
    total: number;
    loading: boolean;
    pageNum: number;
    pageSize: number;
    pagination: IPagination;
    updatePage: (pageNum: number, pageSize?: number) => void;
    reqTableData: (params: Omit<Partial<T>, keyof ITablePage>) => void;
} {
    const fisrtRef = useRef(true)
    const paramsRef = useRef<Omit<Partial<T>, keyof ITablePage>>(null)
    const [loading, setLoading] = useState(false)
    const [tableData, setTableData] = useState({
        list: [],
        total: 0,
    })

    const [pageOptions, setPageOptions] = useState<ITablePage>({
        pageNum: 1,
        pageSize: 10,
    })

    const reqData = (params: any) => {
        setLoading(true)
        api(params).then((data) => {
            fisrtRef.current = false
            setTableData(() => ({
                list: data.beans,
                total: data.bean.total,
            }))
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })
    }
    useEffect(() => {
        reqData({
            ...pageOptions
        })
    }, [pageOptions])
  
    const updatePage = useCallback(
        (pageNum: number, pageSize?: number) => {
            setPageOptions(state => ({
                ...state,
                pageNum,
                pageSize,
            }))
        },
        [],
    )
    const reqTableData = useCallback(
        (params: Omit<Partial<T>, keyof ITablePage>) => {
            paramsRef.current = params
            setPageOptions(state => ({
                ...state,
                pageNum: 1,
            }))
        },
        [],
    )
    const pagination = useMemo(
        () => ({
            total: tableData.total,
            showQuickJumper: true,
            showSizeChanger: true,
            current: pageOptions.pageNum,
            pageSize: pageOptions.pageSize,
            onChange: updatePage,
            onShowSizeChange: updatePage,
            pageSizeOptions: ['10', '20', '30', '50'],
        }), 
        [tableData.total, pageOptions, updatePage]
    )

    return {
        ...tableData,
        ...pageOptions,
        loading,
        pagination,
        updatePage,
        reqTableData,
    }
}