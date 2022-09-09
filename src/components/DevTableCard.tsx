import { List } from 'antd';

interface PropsType {
    containerstyle?: Object,
    cardsProps?: Object,
    data: Array<Object>,
    renderItem: (item: any) => JSX.Element,
    total?: number,
    onPageChange?: any,
}

export const DevTableCard = (props: PropsType) => {
    const { containerstyle, cardsProps, data, renderItem, total, onPageChange } = props
    const defaultCardsProps = {
        grid:{
            gutter: 16,
            xs: 2,
            sm: 3,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 5,
        },
        pagination: {
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: onPageChange,
            total
        },
    };

    return (
        <div style={containerstyle}>
            <List
                {...defaultCardsProps}
                {...cardsProps}
                dataSource={data}
                renderItem={renderItem}
            />
        </div >
    )
}


