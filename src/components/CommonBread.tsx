import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, Path } from 'react-router-dom';

type LinkToType = Partial<Path> | string

export type breadItemType = { url: LinkToType, title: string }

export const CommonBread = ({ data }: { data: breadItemType[] }) => {
    return (
        <Breadcrumb style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 48px',
            background: '#fff',
            zIndex: '1',
            height: '40px',
            boxShadow: '0px 1px 10px 1px rgba(0, 0, 0, 0.1)',
            lineHeight: '40px',
            marginTop: '64px',
            position: 'fixed',
            width: '100%'
        }}> {
                data.map((item: breadItemType, index: number) => (
                    <Breadcrumb.Item key={index}>
                        <Link to={item.url} className="button">
                            {item.title}
                        </Link>
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb >
    )
}


