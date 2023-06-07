import { useState } from "react";
import styles from "../styles/sign-in.module.css";
import Link from "next/link";
import Head from "next/head";
import handleSubmit from "./validators/sign-in-validator";
import { Layout, theme, Form, Input, Button } from "antd";
const { Content, Header } = Layout;

export default function SignInPage() {
  //Declare states to store user's input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //Call handleSubmit component to validate and process
  const handleSignIn = (e) => {
    e.preventDefault();
    handleSubmit(email, password);
  };

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
          background: colorBgContainer,
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Content className={styles.content}>
          <Form
            labelCol={{ span: 6 }}
            className={styles.signInForm}
            autoComplete="off"
          >
            <p className={styles.signInTitle}>Sign in</p>
            <Form.Item label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <p className={styles.forgotPassword}>Forgot Password</p>

            <Form.Item className={styles.signInButton}>
              <Button type="primary" htmlType="submit" onClick={handleSignIn}>
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
