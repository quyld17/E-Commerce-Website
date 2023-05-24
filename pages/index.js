import React from "react";
import Head from "next/head";
import SideBar from "./side-bar";
import NavigationBar from "./navigation-bar";
import ProductShowcase from "./product-showcase";

import { Layout, theme } from "antd";
const { Content } = Layout;

export default function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Head>
        <title>E-Commerce Website</title>
      </Head>
      <NavigationBar />
      <Layout>
        <SideBar />
        <Layout
          style={{
            padding: "24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <h1>
              <ProductShowcase />
            </h1>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
