import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import NavigationBar from "./navigation-bar";
import { Layout, theme } from "antd";
const { Content } = Layout;

export default function ProductPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const [users, setUsers] = useState([]);

  // const fetchUserData = () => {
  //   fetch("http://localhost:8080/album")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUsers(data);
  //     });
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Head>
        <title>Product Page</title>
      </Head>
      <NavigationBar />
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/* <ul>
            {users.map((user) => (
              <li>{user.Price}</li>
            ))}
          </ul> */}
        </Content>
      </Layout>
    </Layout>
  );
}
