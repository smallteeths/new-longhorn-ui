import React, { useEffect }  from 'react';
import { Helmet } from 'react-helmet'
import { ConfigProvider, Breadcrumb, Layout, Menu } from 'antd'
import {
    Outlet,
  } from "react-router-dom";
import { classnames, config } from '../utils'
import Header from '../components/layout/header'

const { Content, Footer } = Layout;

export function APP() {

  return (
    <ConfigProvider>
      <Helmet>
        <title>Longhorn</title>
        <link rel="icon" href={config.logoSrc} type="image/x-icon" />
      </Helmet>
      <Layout className="layout">
        <Header/>
        <Content
          className="content"
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
        <Footer>
          longhorn
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}