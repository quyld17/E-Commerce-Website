import Link from "next/link";
import Head from "next/head";
import NavigationBar from "./navigation-bar";
import { Layout, theme } from "antd";
const { Content } = Layout;

export default function ProductPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
        ></Content>
      </Layout>
    </Layout>
  );
}
