import { Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { checkTitle } from 'src/services/http';

export const Navbar = ({ hidden, onMouseLeave, onMouseEnter }: { hidden?: boolean, onMouseLeave?: any, onMouseEnter?: any }) => {
    const { pathname } = useLocation();
    useEffect(() => {
        checkTitle()
    }, [pathname])
    return <Header style={{ position: 'fixed', width: '100%', zIndex: '999', opacity: hidden ? 0 : 1, overflow: 'hidden' }} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['choreography']}>
        <Menu.Item key={'digscreen'}>
            <Link to={`/midp`}>
                {'大屏'}
            </Link>
        </Menu.Item>
        <Menu.Item key={'choreography'}>
            <Link to={`/choreography/datasManage`}>
                {'大屏编排'}
            </Link>
        </Menu.Item>
    </Menu> */}
        <midp-header></midp-header>
    </Header>
}