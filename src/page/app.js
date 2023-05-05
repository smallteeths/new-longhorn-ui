import React from 'react';
import { Helmet } from 'react-helmet'
import { ConfigProvider, Layout } from 'antd'
import { Outlet } from 'react-router-dom';
import { config } from '../utils'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'

const { Content, Footer } = Layout;

export function APP() {

  return (
    <ConfigProvider
      getPopupContainer={node => {
        if (node) {
          return node.parentNode;
        }
        return document.body;
      }}
    >
      <Helmet>
        <title>Longhorn</title>
        <link rel="icon" href={config.logoSrc} type="image/x-icon" />
      </Helmet>
      <Layout className="layout">
        <Header />
        <Bread />
        <Content
          className="content px-24 mb-8 "
        >
          <div className="site-layout-content w-full h-full">
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