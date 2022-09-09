import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ReactNode } from 'react';
import { breadItemType, CommonBread } from '../../components/CommonBread';
import { Navbar } from '../../components/Navbar';

export const HeadBreadLayout = ({ breaddata, children }: { breaddata: breadItemType[], children: ReactNode }) => {
  return (
    <Layout style={{ height: '100%' }}>
      <Navbar />
      <CommonBread data={breaddata}></CommonBread>
      <Content style={{ height: 'calc(100% - 104px)', marginTop: '104px',overflow:'auto' }}>
        {children}
      </Content>
    </Layout >
  )
}