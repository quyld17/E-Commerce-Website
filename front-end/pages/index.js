import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import SideBar from "./side-bar";
import NavigationBar from "./navigation-bar";
import ProductShowcase from "./product-showcase";

import { Layout } from "antd";
const { Content } = Layout;

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve the JWT token from cookie or local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  console.log(token);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Head>
        <title>E-Commerce Website</title>
      </Head>
      <NavigationBar />
      <Layout
        style={{
          backgroundColor: "white",
        }}
      >
        <SideBar />
        <Layout
          style={{
            margin: "24px",
            backgroundColor: "white",
          }}
        >
          <Content
            style={{
              borderRadius: 14,
              padding: 24,
              margin: 0,
              minHeight: 280,
              boxShadow: "0 2px 30px rgba(0, 0, 0, 0.1)",
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
