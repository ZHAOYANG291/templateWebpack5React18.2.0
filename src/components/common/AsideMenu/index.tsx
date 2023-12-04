import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('导航1', 'sub1', <MailOutlined />, [
    getItem('首页', '/main/home'),
    getItem('用户信息', '/main/user'),
    getItem('Option 3', '3'),
    // getItem('Option 4', '4'),
  ]),
  getItem('导航2', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '/main/home1'),
    getItem('Option 6', '/main/home2'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '/main/home3'), getItem('Option 8','/main/home4')]),
  ]),
  getItem('导航3', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '/main/home5'),
    getItem('Option 10', '/main/home6'),
    getItem('Option 11', '/main/home7'),
    getItem('Option 12', '/main/home8'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const AsideMenu: React.FC = () => {
  const navigateTo=useNavigate()
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {  //保证每次只打开一个子菜单
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (

    <ConfigProvider
  theme={{
    components: {
      Menu: {
        /* here is your component tokens */
        itemHeight:40, //菜单项高度
        itemBg:"rgba(255,255,255,0.7)", //菜单项背景色（但实际上是改变的菜单容器的背景色）
        itemColor:"black", //菜单项文字颜色
        itemHoverColor:"yellow", //菜单项文字悬浮颜色
        itemHoverBg:'rgba(245,245,67,0.3)', //菜单项悬浮态背景色
        itemActiveBg:"rgba(245,245,67,0.6)", //菜单项激活态背景色（鼠标点下去的这项的颜色）
        itemSelectedColor:"deepPink", //选中项的文字颜色
       
       
        
      },
    },
  }}
>

    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: "100%",userSelect:"none" }}
      items={items}
      onClick={(e)=>{navigateTo(e.key)}}
    />
    
</ConfigProvider>

 
  );
};

export default AsideMenu;