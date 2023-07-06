import Head from "next/head";
import { useState, useEffect } from "react";

import NavigationBar from "./navigation-bar";
import styles from "../styles/check-out.module.css";
import { checkOutColumns, handleCheckOutData } from "./components/layout";
import { handleGetUserDetails } from "./api-handlers/check-out";

import { Table, Radio, Space, Button } from "antd";

export default function CheckOut() {
  const [checkOutData, setCheckOutData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentSelect] = useState(1);
  const [total, setTotal] = useState(0);
  const handlePaymentMethodSelect = (e) => {
    setPaymentSelect(e.target.value);
  };

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
          style={{ fontSize: "16px" }}
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
        <p>{userInfo && userInfo.full_name}</p>
        <p>{userInfo && userInfo.phone_number}</p>
        <p>{address}</p>
      </div>

      <div className={styles.paymentField}>
        <p className={styles.paymentMethodTitle}>Payment Method</p>
        <Radio.Group value={paymentMethod} onChange={handlePaymentMethodSelect}>
          <Space direction="vertical">
            <Radio className={styles.paymentMethodSelectField} value={1}>
              Cash on Delivery
            </Radio>
            <Radio className={styles.paymentMethodSelectField} value={2}>
              Bank Transfer
            </Radio>
          </Space>
        </Radio.Group>
      </div>

      <div className={styles.totalField}>
        <div className={styles.textField}>
          <div className={styles.subtotal}>
            <p>Subtotal:</p>
            <p>asdasd</p>
          </div>
          <div className={styles.shippingTotal}>
            <p>Shipping Total:</p>
          </div>
          <div className={styles.total}>
            <p>Total:</p>
            <p>
              {Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </p>
          </div>
        </div>

        <div className={styles.placeOrderButtonField}>
          <Button
            type="primary"
            // onClick={handleCheckOut}
            className={styles.placeOrderButton}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
