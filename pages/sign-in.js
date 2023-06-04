import { useState } from "react";
import styles from "../styles/sign-in.module.css";
import Link from "next/link";
import Head from "next/head";
import validator from "validator";
import { Layout, theme, Form, Input, Button } from "antd";
const { Content, Header } = Layout;

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      alert("Email is empty! Please try again");
      return;
    } else if (password === "") {
      alert("Password is empty! Please try again");
      return;
    }

    //Check if the email address is invalid
    if (!validator.isEmail(email)) {
      alert("Invalid email address! Please try again");
      return;
    }
    const user = {
      email,
      password,
    };

    // Make a POST request to create an acount
    fetch("http://localhost:8080/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
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
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
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
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
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
