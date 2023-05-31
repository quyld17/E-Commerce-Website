import { useState } from "react";
import styles from "../styles/sign-in.module.css";
import Link from "next/link";
import Head from "next/head";
import { Layout, theme, Form, Input, Button } from "antd";
const { Content, Header } = Layout;

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Head>
        <title>Sign In</title>
      </Head>

      <Header className={styles.navigationBar}>
        <div className={styles.websiteLogo}>
          <Link href="/">Logo</Link>
        </div>
      </Header>
      <Layout
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Content className={styles.content}>
          <Form
            labelCol={{ span: 7 }}
            className={styles.signInForm}
            autoComplete="off"
          >
            <h1 className={styles.signInTitle}>Sign in</h1>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <p className={styles.forgotPassword}>Forgot Password</p>

            <Form.Item className={styles.signInButton}>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>

            <p className={styles.createAccount}>
              Don't have an account?{" "}
              <Link className={styles.signUp} href="/sign-up">
                Sign Up
              </Link>
            </p>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
}
