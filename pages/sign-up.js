import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import validator from "validator";
import styles from "../styles/sign-up.module.css";
import { Layout, Form, Input, Button } from "antd";
const { Content, Header } = Layout;

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check if the password and confirmPassword are matched or not
    if (password !== confirmPassword) {
      alert("password does not match");
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
    fetch("http://localhost:8080/sign-up", {
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
          window.location.href = "/sign-up-complete ";
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
            <p className={styles.signUpTitle}>Sign up</p>
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
