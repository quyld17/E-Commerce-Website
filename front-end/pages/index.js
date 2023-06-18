import React from "react";
import Head from "next/head";
import { useState } from "react";
import SideBar from "./side-bar";
import NavigationBar from "./navigation-bar";
import ProductShowcase from "./product-showcase";
import styles from "../styles/index.module.css";
import { Layout } from "antd";
const { Content } = Layout;

export default function Home() {
  const [sortingKey, setSortingKey] = useState(0);

  const handleSortingKeyChange = (key) => {
    setSortingKey(key);
  };

  return (
    <Layout className={styles.mainLayout}>
      <Head>
        <title>E-Commerce Website</title>
      </Head>
      <NavigationBar />
      <Layout className={styles.body}>
        <SideBar onSortingKeyChange={handleSortingKeyChange} />
        <Layout className={styles.contentLayout}>
          <Content className={styles.content}>
            <ProductShowcase sortingKey={sortingKey} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
