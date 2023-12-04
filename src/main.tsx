import React from 'react'
import ReactDOM from 'react-dom/client'
//正确的样式引入顺序
//样式初始化一般在最前面
//UI框架的样式
//全局样式
import "@/assets/styles/global.scss"
//组件样式
import App from './App'
import { HashRouter } from 'react-router-dom'
//状态管理与项目挂钩
import { Provider } from "react-redux"
import store from "@/store/index"
// import "@/request/mock/index.ts"
//import Router from '@/router' 老式写法
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //   <Router/> 老式写法
  // </React.StrictMode>
  //最外层要有一个Provider
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </Provider>
)
