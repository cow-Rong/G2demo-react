import { Button } from 'antd';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
// import { VisualViewItem } from '../../features/VisualConfig/typing';
import { useAppSelector } from '../../redux/hooks';
import styles from '../style.module.scss';

export const BigScreenLayout = ({ children }: { children: ReactNode }) => {
  const [guideMask, setGuideMask] = useState(false);
  const [hiddenNav, setHddenNav] = useState(false);

  // const visualConfigList = useAppSelector((s) => s.visualConfig.visualList);
  // const navigate = useNavigate()
  // const handleWindowKeydown = (event: KeyboardEvent) => {
  //   const route = window.location.pathname
  //   if (route.indexOf('/BigScreen/customscreen') === -1) return;
  //   let index = Number(route.replace(/[^\d]/g, ''));
  //   // const len = visualConfigList.filter((item: VisualViewItem) => item.used).length;
  //   if (event.keyCode === 39) {
  //     // 监听到 右 的键盘按下事件时
  //     // index >= len - 1 ? index = 0 : index++;
  //     // window.location.href=`/BigScreen/customscreen${index}`;
  //     navigate(`/BigScreen/customscreen${index}`,{});
  //     // history.push(to)
  //   }
  //   if (event.keyCode === 37) {
  //     // 监听到 左 的键盘按下事件时
  //     // index <= 0 ? index = len - 1 : index--;
  //     // window.location.href=`/BigScreen/customscreen${index}`;
  //     navigate(`/BigScreen/customscreen${index}`,{});
  //     // history.push(to)
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener('keydown', handleWindowKeydown);
  //   return () => {
  //     window.removeEventListener('keydown', handleWindowKeydown);
  //   }
  // }, []);
  return (
    <Layout style={{ height: '100%',width:'100%',overflow: 'hidden' }}>
       <Navbar hidden={hiddenNav} onMouseLeave={() => setHddenNav(true)} onMouseEnter={() => setHddenNav(false)}/>
      <Content style={{ height: '100%', width:'100%',overflow: 'hidden' }}>
        {/* {
          guideMask ? (
            <div className={styles['dash-mask']}>
              <img src={'/assets/image/big-screen/guide/guide.gif'} alt="" />
              <Button type="primary" onClick={() => { setGuideMask(false) }}>我知道了</Button>
            </div>
          ) : null
        } */}
        {children}
      </Content >
    </Layout >
  )
}
