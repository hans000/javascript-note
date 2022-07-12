import { TableProps } from 'antd/lib/table';

declare module 'antd/lib/table' {
    export interface TableProps<T> {
        onSuccess?: any;
    }
}