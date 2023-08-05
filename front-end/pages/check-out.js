import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import NavigationBar from "../components/navigation-bar";
import styles from "../styles/check-out.module.css";
import {
  checkOutColumns,
  handleCheckOutData,
} from "../components/check-out/products-table";
import { handleCreateOrderAPI } from "../api/handlers/order";
import { handleGetUserDetailsAPI } from "../api/handlers/user";
import { handleGetCartSelectedProductsAPI } from "../api/handlers/cart";

import { Table, Radio, Space, Button, message } from "antd";

export default function CheckOut() {
  const [checkOutData, setCheckOutData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [address, setAddress] = useState();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [subTotal, setSubTotal] = useState(0);

  const router = useRouter();

  const handlePaymentMethodSelect = (e) => {
    setPaymentMethod(e.target.value);
  };

  const data = handleCheckOutData(checkOutData);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
      return;
    }

    handleGetCartSelectedProductsAPI()
      .then((data) => {
        if (data.cart_products.length === 0) {
          message.error("You have not selected any products for checkout");
          router.push("/");
        }
        setCheckOutData(data.cart_products);
        setSubTotal(data.total_price);
      })
      .catch((error) => {
        console.log("Error getting check-out products' details:", error);
      });

    handleGetUserDetailsAPI()
      .then((data) => {
        setUserInfo(data.user);
        setAddress(data.address);
      })
      .catch((error) => {
        console.log("Error getting delivery address: ", error);
      });
  }, []);

  const handlePlaceOrder = (paymentMethod) => {
    handleCreateOrderAPI(paymentMethod)
      .then((data) => {
        if (data.message) {
          message.error(data.message);
        } else {
          router.push("/order-complete");
        }
      })
      .catch((error) => {
        console.log("Place order unsuccessfully: ", error);
      });
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
        <p>
          {address &&
            address.house_number +
              ", " +
              address.street +
              ", " +
              address.ward +
              ", " +
              address.district +
              ", " +
              address.city}
        </p>
      </div>

      <div className={styles.paymentField}>
        <p className={styles.paymentMethodTitle}>Payment Method</p>
        <Radio.Group value={paymentMethod} onChange={handlePaymentMethodSelect}>
          <Space direction="vertical">
            <Radio
              className={styles.paymentMethodSelectField}
              value="Cash on Delivery"
            >
              Cash on Delivery
            </Radio>
            <Radio
              className={styles.paymentMethodSelectField}
              value="Bank Transfer"
            >
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
            <p>Shipping Total: </p>
            <p>
              {Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
              }).format(0)}
            </p>
          </div>
          <div className={styles.total}>
            <p>Total:</p>
            <p>
              {Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
              }).format(subTotal + 0)}
            </p>
          </div>
        </div>

        <div className={styles.placeOrderButtonField}>
          <Button
            type="primary"
            onClick={() => handlePlaceOrder(paymentMethod)}
            className={styles.placeOrderButton}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
