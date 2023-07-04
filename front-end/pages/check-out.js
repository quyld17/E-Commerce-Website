import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import NavigationBar from "./navigation-bar";
import styles from "../styles/check-out.module.css";
import { checkOutColumns, checkOutData } from "./components/layout";

import { Table } from "antd";

export default function CheckOut() {
  const [checkoutData, setCheckoutData] = useState([]);
  const data = checkOutData(checkoutData);
  const router = useRouter();

  useEffect(() => {
    const queryData = router.query.checkoutData;

    if (queryData) {
      const parsedData = JSON.parse(queryData);
      setCheckoutData(parsedData);
    }
  }, []);

  return (
    <div className={styles.layout}>
      <Head>
        <title>Check Out</title>
      </Head>
      <NavigationBar />
      <div className={styles.content}>Delivery Address</div>
      <div className={styles.content}>
        <Table
          size="large"
          showHeader={true}
          tableLayout="fixed"
          pagination={false}
          columns={checkOutColumns}
          dataSource={data}
        ></Table>
      </div>
      <div className={styles.content}>Payment Method</div>
    </div>
  );
}
