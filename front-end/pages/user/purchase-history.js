import Head from "next/head";

import NavigationBar from "../../components/navigation-bar";
import styles from "../../styles/purchase-history.module.css";
import {
  columns,
  handleOrderData,
} from "../../components/user/purchase-history/orders-table";

import { Table } from "antd";

export default function PurchaseHistory() {
  const data = handleOrderData([]);

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
            columns={columns}
            dataSource={data}
          ></Table>
        </div>
      </div>
    </div>
  );
}
