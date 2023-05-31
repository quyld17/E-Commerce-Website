import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/sign-up.module.css";
import { Layout, Form, Input, Button } from "antd";
const { Content, Header } = Layout;

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit() {
    if (password !== confirmPassword) {
      alert("password does not match");
    }
  }

  return (
    <Layout>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Header className={styles.navigationBar}>
        <div className={styles.websiteLogo}>
          <Link href="/">Logo</Link>
        </div>
      </Header>

      <Layout className={styles.mainPage}>
        <Content className={styles.content}>
          <Form
            labelCol={{ span: 7 }}
            className={styles.signUpForm}
            autoComplete="off"
          >
            <h1 className={styles.signUpTitle}>Sign up</h1>
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

            <Form.Item
              label="Confirm password"
              name="confirm password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
              ]}
            >
              <Input.Password
                type="password"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
            {/* {if valid ? :} */}

            <Form.Item className={styles.signUpButton}>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Sign up
              </Button>
            </Form.Item>

            <p className={styles.alreadyHadAnAccount}>
              Already had an account?{" "}
              <Link className={styles.signInButton} href="/sign-in">
                Sign In
              </Link>
            </p>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
}
