import Head from "next/head";
import { useState, useEffect } from "react";

import NavigationBar from "../../components/navigation-bar";
import styles from "../../styles/purchase-history.module.css";
import {
  columns,
  handleOrderData,
  handleOrderDetails,
} from "../../components/user/purchase-history/orders-table";
import { handleGetOrders } from "@/api/handlers/order";

import { Table } from "antd";

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
      return;
    }

    handleGetOrders()
      .then((data) => {
        setOrders(data.orders);
        setOrderProducts(data.order_products);
      })
      .catch((error) => {
        console.log("Error getting delivery address: ", error);
      });
  }, []);

  const orderData = handleOrderData(orders);

  return (
    <div>
      <Head>
        <title>Purchase History</title>
      </Head>
      <NavigationBar />
      <div className={styles.content}>
        <div className={styles.sider}>asdasd</div>
        <div className={styles.orders}>
          <Table
            size="large"
            showHeader={true}
            tableLayout="fixed"
            pagination={false}
            expandable={{
              expandedRowRender: (record) =>
                handleOrderDetails(record, orderProducts),
              defaultExpandedRowKeys: [0],
            }}
            columns={columns}
            dataSource={orderData}
          ></Table>
        </div>
      </div>
    </div>
  );
}
