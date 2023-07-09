import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import NavigationBar from "./navigation-bar";
import styles from "../styles/check-out.module.css";
import { checkOutColumns, handleCheckOutData } from "./components/layout";
import { handleGetUserDetails } from "./api-handlers/check-out";
import { handleGetCartSelectedProducts } from "./api-handlers/cart";

import { Table, Radio, Space, Button, message } from "antd";

export default function CheckOut() {
  const [checkOutData, setCheckOutData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentSelect] = useState(1);
  const [subTotal, setSubTotal] = useState(0);

  const router = useRouter();

  const handlePaymentMethodSelect = (e) => {
    setPaymentSelect(e.target.value);
  };

  const data = handleCheckOutData(checkOutData);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/sign-in");
      return;
    }
    const storedIDs = JSON.parse(localStorage.getItem("products"));
    handleGetCartSelectedProducts(storedIDs)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCheckOutData(data.retrievedProducts);
          setSubTotal(data.totalPrice);
        }
      })
      .catch((error) => {
        console.log("Error getting check-out products' details:", error);
      });

    handleGetUserDetails()
      .then((data) => {
        setUserInfo(data.user);
        setAddress(data.address_display);
      })
      .catch((error) => {
        console.log("Error getting delivery address: ", error);
      });
  }, []);

  const handlePlaceOrder = () => {
    if (paymentMethod !== 1) {
      message.warning(
        "Only Cash on Delivery is accepted at the moment. Please try again"
      );
    } else {
      message.info("Order is being processed!");
    }
  };

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
            <p>
              {Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
              }).format(subTotal)}
            </p>
          </div>
          <div className={styles.shippingTotal}>
            <p>Shipping Total:</p>
          </div>
          <div className={styles.total}>
            <p>Total:</p>
            <p>
              {/* {Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
              }).format(total)} */}
            </p>
          </div>
        </div>

        <div className={styles.placeOrderButtonField}>
          <Button
            type="primary"
            onClick={handlePlaceOrder}
            className={styles.placeOrderButton}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
