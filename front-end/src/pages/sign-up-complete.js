import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/sign-up-complete.module.css";
import { Layout } from "antd";
const { Content, Header } = Layout;

export default function SignUpPage() {
  return (
    <Layout>
      <Head>
        <title>Sign Up Complete</title>
      </Head>

      <Header className={styles.navigationBar}>
        <div className={styles.websiteLogo}>
          <Link href="/">Logo</Link>
        </div>
      </Header>

      <Layout className={styles.mainPage}>
        <Content className={styles.content}>
          <p className={styles.signUpCompleteTitle}>Sign up complete!</p>
          <p>
            Click{" "}
            <Link href="/sign-in" className={styles.redirect}>
              here
            </Link>{" "}
            to sign in
          </p>
          <p>
            or back to{" "}
            <Link href="/" className={styles.redirect}>
              homepage
            </Link>
            .
          </p>
        </Content>
      </Layout>
    </Layout>
  );
}
