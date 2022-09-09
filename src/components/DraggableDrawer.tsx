import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Input, Button, Drawer } from 'antd';
import style from './index.less'

const { TextArea } = Input;

interface PropsType {
  props: any,
  children: ReactNode
}

export const DraggableDrawer = ({ props, children }: PropsType) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onmousedown = function (e: any) {
    let isDown = false
    var x = e.clientX;
    var y = e.clientY;
    //获取左部和顶部的偏移量
    var l = e.target.offsetLeft;
    //开关打开
    isDown = true;
    // setIsDown(true)
    window.onmousemove = function (e) {
      if (isDown == false) {
        return;
      }
      //获取x和y
      var nx = e.clientX;
      //计算移动后的左偏移量和顶部的偏移量
      var nl = nx - (x - l);
      // document.getElementById('line').style.left = 0 + 'px';
      // document.getElementsByClassName('ant-drawer-content-wrapper')[0].style.width = window.innerWidth && document.documentElement.clientWidth - e.screenX + 'px';
    }
    window.onmouseup = () => {
      window.onmousemove = null
    }
  };
  return (
    <>
      <Button id='aa' type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={true}>
        {/* <div className={style.bar}></div> */}
        <div id='line' onMouseDown={(e) => onmousedown(e)} className={style.line}></div>
        {children}
      </Drawer>
    </>
  )
}