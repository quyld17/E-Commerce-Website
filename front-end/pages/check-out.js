import Head from "next/head";
import { useState, useEffect } from "react";

import NavigationBar from "./navigation-bar";
import styles from "../styles/check-out.module.css";
import { checkOutColumns, handleCheckOutData } from "./components/layout";
import { handleGetUserDetails } from "./api-handlers/check-out";

import { Table } from "antd";

export default function CheckOut() {
  const [checkOutData, setCheckOutData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [address, setAddress] = useState("");

  const data = handleCheckOutData(checkOutData);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    setCheckOutData(storedProducts);

    handleGetUserDetails()
      .then((data) => {
        setUserInfo(data.user);
        setAddress(data.address_display);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <div className={styles.layout}>
      <Head>
        <title>Check Out</title>
      </Head>
      <NavigationBar />

      <div className={styles.productsField}>
        <Table
          size="large"
          showHeader={true}
          tableLayout="fixed"
          pagination={false}
          columns={checkOutColumns}
          dataSource={data}
        ></Table>
      </div>
      <div className={styles.deliveryAddressField}>
        <p className={styles.deliveryAddressTitle}>Delivery Address</p>
        <div>{userInfo && userInfo.full_name}</div>
        <div>{userInfo && userInfo.phone_number}</div>
        <div>{address}</div>
      </div>
      <div className={styles.paymentField}>Payment Method</div>
    </div>
  );
}
