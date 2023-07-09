import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import NavigationBar from "./navigation-bar";
import {
  handleGetAllCartProducts,
  handleAdjustCartProductQuantity,
  handleGetCartSelectedProducts,
} from "./api-handlers/cart";
import { cartColumns, cartData } from "./components/layout";
import { handleCancel, handleOk } from "./components/confirm-window";
import styles from "../styles/cart.module.css";

import { Button, Table, Modal, message } from "antd";

const handleProductRedirect = (id, router) => {
  router.push(`/product/${id}`);
};

const handleCheckOut = (selectedProducts, router) => {
  if (selectedProducts.length === 0) {
    message.error("You have not selected any items for checkout");
    return;
  }
  localStorage.setItem("products", JSON.stringify(selectedProducts));
  router.push("/check-out");
};

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/sign-in");
      return;
    }

    handleGetAllCartProducts()
      .then((data) => {
        setCartProducts(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    handleGetCartSelectedProducts(selectedProducts)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setTotal(data.totalPrice);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [selectedProducts]);

  const handleQuantitySelection = (id, quantity) => {
    if (quantity === 0) {
      // Open the modal to confirm deletion
      setIsModalOpen(true);
      // Set the deletingProduct state to the product being deleted
      const product = cartProducts.find((product) => product.product_id === id);
      setDeletingProduct(product);
    } else {
      handleAdjustCartProductQuantity(id, quantity)
        .then(() => {
          const updatedCartProducts = cartProducts.map((product) => {
            if (product.product_id === id) {
              return { ...product, quantity: quantity };
            }
            return product;
          });
          setCartProducts(updatedCartProducts);

          const updatedSelectedProducts = selectedProducts.map((product) => {
            if (product.key === id) {
              return { ...product, quantity: quantity };
            }
            return product;
          });
          setSelectedProducts(updatedSelectedProducts);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  const data = cartData(
    cartProducts,
    handleProductRedirect,
    handleQuantitySelection
  );

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
            selectedProducts,
            setSelectedProducts,
            setIsModalOpen
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
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
              const selectedProductIDs = selectedRows.map((row) => ({
                product_id: row.key,
              }));
              setSelectedProducts(selectedProductIDs);
            },
          }}
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
              onClick={() => handleCheckOut(selectedProducts, router)}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
