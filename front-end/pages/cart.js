import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import NavigationBar from "../components/navigation-bar";
import {
  handleAdjustCartProductQuantity,
  handleSelectCartProducts,
} from "../api/handlers/cart";
import { handleGetCartProducts } from "../components/cart/get-products";
import { cartColumns, cartData } from "../components/cart/products-table";
import { handleCancel, handleOk } from "../components/cart/delete-confirm";
import styles from "../styles/cart.module.css";

import { Button, Table, Modal, message } from "antd";

const handleProductRedirect = (id, router) => {
  router.push(`/product/${id}`);
};

const handleCheckOut = (router, selectedRowKeys) => {
  if (selectedRowKeys.length === 0) {
    message.error(
      "You have not selected anything for check out. Please try again"
    );
    return;
  } else {
    router.push("/check-out");
  }
};

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysPrev, setSelectedRowKeysPrev] = useState([]);

  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/sign-in");
      return;
    }

    handleGetCartProducts(
      setCartProducts,
      setTotal,
      setSelectedRowKeys,
      setSelectedRowKeysPrev
    );
  }, []);

  const handleAdjustQuantity = (id, quantity) => {
    if (quantity === 0) {
      setIsModalOpen(true);
      const product = cartProducts.find((product) => product.product_id === id);
      setDeletingProduct(product);
    } else {
      handleAdjustCartProductQuantity(id, quantity)
        .then(() => {
          handleGetCartProducts(
            setCartProducts,
            setTotal,
            setSelectedRowKeys,
            setSelectedRowKeysPrev
          );
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  const data = cartData(
    cartProducts,
    handleProductRedirect,
    handleAdjustQuantity
  );

  const handleSelectProducts = (selectedRowKeys) => {
    const newlySelectedProducts = selectedRowKeys.filter(
      (key) => !selectedRowKeysPrev.includes(key)
    );
    const newlyDeselectedProducts = selectedRowKeysPrev.filter(
      (key) => !selectedRowKeys.includes(key)
    );

    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowKeysPrev(selectedRowKeys);

    const selectedProducts = newlySelectedProducts.map((key) => ({
      product_id: key,
    }));
    const deselectedProducts = newlyDeselectedProducts.map((key) => ({
      product_id: key,
    }));

    if (selectedProducts.length !== 0) {
      handleSelectCartProducts(selectedProducts)
        .then(() => {
          handleGetCartProducts(
            setCartProducts,
            setTotal,
            setSelectedRowKeys,
            setSelectedRowKeysPrev
          );
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      handleSelectCartProducts(deselectedProducts)
        .then(() => {
          handleGetCartProducts(
            setCartProducts,
            setTotal,
            setSelectedRowKeys,
            setSelectedRowKeysPrev
          );
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
    console.log(selectedProducts, deselectedProducts);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: handleSelectProducts,
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>Cart</title>
      </Head>
      <NavigationBar />

      <Modal
        title="Do you want to remove this item?"
        open={isModalOpen}
        onOk={() =>
          handleOk(
            deletingProduct,
            setIsModalOpen,
            setCartProducts,
            setTotal,
            setSelectedRowKeys,
            setSelectedRowKeysPrev
          )
        }
        onCancel={() => handleCancel(setIsModalOpen)}
      >
        <p>{deletingProduct && deletingProduct.product_name}</p>
      </Modal>

      <div className={styles.content}>
        <Table
          size="large"
          showHeader={true}
          rowSelection={rowSelection}
          tableLayout="fixed"
          pagination={false}
          columns={cartColumns}
          dataSource={data}
          className={styles.table}
        ></Table>

        <div className={styles.checkoutBar}>
          <div className={styles.checkoutBarTotal}>
            <p>Total:</p>
            <p>
              {Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </p>
          </div>
          <div className={styles.checkoutButtonField}>
            <Button
              className={styles.checkOutButton}
              type="primary"
              onClick={() => handleCheckOut(router, selectedRowKeys)}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
