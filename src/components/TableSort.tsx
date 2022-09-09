import { useState } from 'react';
import { CaretUpOutlined,CaretDownOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

export interface PropsType {
    defaultSort: string
    sortChange:(dir:string)=>void
}

export const TableSortIcon = (prop: PropsType) => {
    const {defaultSort,sortChange}=prop;
    const [sortDirections, setSortDirections] = useState<string>(defaultSort);

    const handleClick = ()=>{
        debugger
        const dir = sortDirections === 'asc' ? 'desc':'asc';
        sortChange(dir)
        setSortDirections(dir);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={handleClick}>
            <CaretUpOutlined style={{ fontSize: '11px'}} className={sortDirections==='asc'? styles['light-icon']:styles['dark-icon']}/>
            <CaretDownOutlined style={{ fontSize: '11px'}} className={sortDirections==='desc'? styles['light-icon']:styles['dark-icon']}/>
        </div>
    );
};