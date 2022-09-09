import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/lib/table';

class PropsType<T>{
    columns:ColumnsType<T> = [];
    data:T[] = [];
    showTitle?: boolean = false; 
    defaultTitle:any;
    total?:number = 0;
    onPageChange?:any;
    tableProps?:any;
    containerstyle?:any;
}

export const DevTableList = <T extends object>(props:PropsType<T>) => {
    const {columns,data,showTitle,defaultTitle,total,onPageChange,tableProps,containerstyle}= props;
    const defaultTableProps: TableProps<T> = {
        bordered: false,
        loading: false,
        title: showTitle ? defaultTitle : undefined,
        pagination: {
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: onPageChange,
            total
        },
    };

    return (
        <div style={containerstyle}>
            <Table
                {...defaultTableProps}
                {...tableProps}
                columns={columns}
                dataSource={data}
            />
        </div >
    )
}


