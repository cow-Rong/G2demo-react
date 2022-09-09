import { Layout, Menu, MenuProps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ReactNode } from 'react';
import { breadItemType, CommonBread } from '../../components/CommonBread';
import { Navbar } from '../../components/Navbar';
import { PieChartOutlined, FundOutlined, DatabaseOutlined, DesktopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const HeadBreadSiderLayout = ({ breaddata, children }: { breaddata: breadItemType[], children: ReactNode }) => {
  const route = window.location.hash
  const items: MenuProps['items'] = [
    {
      label:  (
        <Link to={`/choreography/pagesManage`}>
          {'大屏管理'}
        </Link>
      ),
      key: '#/choreography/pagesManage',
      icon: <DesktopOutlined />
    },
    {
      label: (
        <Link to={`/choreography/cardsManage`}>
          {'卡片管理'}
        </Link>
      ),
      key: '#/choreography/cardsManage',
      icon: <FundOutlined />
    },
    {
      label: (
        <Link to={`/choreography/graphsManage`}>
          {'图形库管理'}
        </Link>
      ),
      key: '#/choreography/graphsManage',
      icon: <PieChartOutlined />
    },
    {
      label: (
        <Link to={`/choreography/datasManage`}>
          {'接口数据管理'}
        </Link>
      ),
      key: '#/choreography/datasManage',
      icon: <DatabaseOutlined />
    }
  ];

  return (
    <Layout style={{ height: '100%' }}>
      <Navbar />
      <CommonBread data={breaddata}></CommonBread>
      <Content style={{ height: 'calc(100% - 104px)', marginTop: '104px', overflow: 'auto',display:'flex' }}>
        <Menu
          className='headbreadsider main-menu'
          defaultSelectedKeys={[route]}
          mode="inline"
          items={items}
        /><>{children}</>
      </Content>
    </Layout >
  )
}