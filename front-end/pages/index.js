import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
// import Link from "next/link";
import SideBar from "./side-bar";
import NavigationBar from "./navigation-bar";
import ProductShowcase from "./product-showcase";

import { Layout } from "antd";
const { Content } = Layout;

export default function Home() {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/images")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImageURLs(data);
        }
        // console.log(data, imageURLs);
      })
      .catch((error) => console.log(error));
  }, []);

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
            <div style={{ display: "flex"}}>
              {imageURLs.map((url, index) => (
                <div key={index}>
                  <img
                    style={{ width: "200px", height: "auto" }}
                    src={url}
                    alt={`Image ${index}`}
                  ></img>
                </div>
              ))}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
