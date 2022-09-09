import 'zone.js/plugins/zone-patch-message-port';
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from "react-redux";
import store from './redux/store';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

if (module && module.hot) {
  module.hot.accept();
}
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
    </ConfigProvider>
  </React.StrictMode>
)