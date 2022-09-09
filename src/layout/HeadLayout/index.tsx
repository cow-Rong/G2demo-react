import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { ReactNode } from 'react';
import { Navbar } from '../../components/Navbar';

export const HeadLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout style={{ height: '100%' }}>
      <Navbar />
      <Content style={{ height: 'calc(100% - 64px)', marginTop: '64px',overflow:'auto' }}>
        {children}
      </Content>
    </Layout >
  )
}