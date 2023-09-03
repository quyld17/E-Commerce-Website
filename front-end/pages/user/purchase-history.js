import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import NavigationBar from "../../components/navigation-bar";
import styles from "../../styles/purchase-history.module.css";
import {
  columns,
  handleOrders,
  handleOrderProducts,
} from "../../components/user/purchase-history/orders-table";
import UserSideBar from "@/components/user/side-bar";
import { handleGetOrdersAPI } from "@/api/handlers/order";

import { Table } from "antd";

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
      return;
    }

    handleGetOrdersAPI()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log("Error getting delivery address: ", error);
      });
  }, []);

  const orderData = handleOrders(orders);

  return (
    <div>
      <Head>
        <title>Purchase History</title>
      </Head>
      <NavigationBar />
      <div className={styles.content}>
        <UserSideBar />
        <div className={styles.orders}>
          <Table
            size="large"
            showHeader={true}
            tableLayout="fixed"
            pagination={true}
            expandable={{
              expandedRowRender: (record) =>
                handleOrderProducts(record, orders),
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
