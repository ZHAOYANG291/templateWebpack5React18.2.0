// import React from "react"

import { Layout, Space } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { useState } from "react";
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import AsideMenu from '@/components/common/AsideMenu';

const headerStyle: React.CSSProperties = {
    textAlign: 'center',

    height: "10vh",
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'rgb(179,192,209)',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    height: "90vh",
    // lineHeight: '120px',
    backgroundColor: 'rgb(233,238,243)',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    height: '90vh',
    backgroundColor: 'rgb(211,220,230)',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

const Main: React.FC = () => {

    return (
        <>
            <div className={styles.container}>

                <Layout >
                    <Header style={headerStyle}>Header</Header>
                    <Layout hasSider>
                        <Sider style={siderStyle}><AsideMenu/></Sider>
                        <Content style={contentStyle}>

                            <Outlet />

                        </Content>
                    </Layout>
                    {/* <Footer style={footerStyle}>Footer</Footer> */}
                </Layout>


            </div>
        </>
    )
}

export default Main