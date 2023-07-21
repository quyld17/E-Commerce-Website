import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";

import styles from "../styles/sign-up-complete.module.css";
import NavigationBar from "../components/navigation-bar";

import { Layout } from "antd";

const { Content } = Layout;

export default function SignUpPage() {
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/");
      return;
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Order Complete</title>
      </Head>
      <NavigationBar />

      <Layout className={styles.mainPage}>
        <Content className={styles.content}>
          <p className={styles.signUpCompleteTitle}>Order complete!</p>
          <p>
            Click{" "}
            <Link href="/user/purchase-history" className={styles.redirect}>
              here
            </Link>{" "}
            to see your purchase history
          </p>
          <p>
            or{" "}
            <Link href="/" className={styles.redirect}>
              continue shopping
            </Link>
            .
          </p>
        </Content>
      </Layout>
    </Layout>
  );
}
