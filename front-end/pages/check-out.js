import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import NavigationBar from "./navigation-bar";
import styles from "../styles/check-out.module.css";

import { Table } from "antd";

const columns = [
  {
    title: "Products Ordered",
    dataIndex: "product",
    width: "500px",
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    align: "center",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    align: "center",
  },
  {
    title: "Subtotal",
    dataIndex: "totalPrice",
    align: "center",
  },
];

export default function CheckOut() {
  const [checkoutData, setCheckoutData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // Retrieve the checkoutData query parameter from the router object
    const queryData = router.query.checkoutData;

    if (queryData) {
      // Parse the queryData string into a JavaScript object
      const parsedData = JSON.parse(queryData);

      // Update the checkoutData state variable
      setCheckoutData(parsedData);
    }
  }, []);

  const data = checkoutData.map((product) => ({
    key: product.product_id,
    product: (
      <div className={styles.productThumbnailAndName}>
        <img
          className={styles.productThumbnail}
          src={product.image_url}
          alt={product.product_name}
        />
        <span className={styles.productName}>{product.product_name}</span>
      </div>
    ),
    price: product.price,
    unitPrice: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price),
    quantity: product.quantity,
    totalPrice: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price * product.quantity),
  }));

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
          columns={columns}
          dataSource={data}
        ></Table>
      </div>
      <div className={styles.content}>Payment Method</div>
    </div>
  );
}
