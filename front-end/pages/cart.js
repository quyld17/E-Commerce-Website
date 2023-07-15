import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import NavigationBar from "../components/navigation-bar";
import {
  handleGetAllCartProducts,
  handleAdjustCartProductQuantity,
  handleSelectCartProducts,
  handleDeselectCartProducts,
} from "../api/handlers/cart";
import { cartColumns, cartData } from "../components/cart/products-table";
import { handleCancel, handleOk } from "../components/cart/delete-confirm";
import styles from "../styles/cart.module.css";

import { Button, Table, Modal, message } from "antd";

const handleProductRedirect = (id, router) => {
  router.push(`/product/${id}`);
};

const handleCheckOut = (router) => {
  router.push("/check-out");
};

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysPrev, setSelectedRowKeysPrev] = useState([]);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const handleAdjustQuantity = (id, quantity) => {
    if (quantity === 0) {
      setIsModalOpen(true);
      const product = cartProducts.find((product) => product.product_id === id);
      setDeletingProduct(product);
    } else {
      handleAdjustCartProductQuantity(id, quantity)
        .then(() => {
          handleGetAllCartProducts()
            .then((data) => {
              setCartProducts(data.cart_products);
              setTotal(data.total_price);
              setSelectedRowKeys(
                data.cart_products
                  .filter((product) => product.selected === 1)
                  .map((product) => product.product_id)
              );
              setSelectedRowKeysPrev(
                data.cart_products
                  .filter((product) => product.selected === 1)
                  .map((product) => product.product_id)
              );
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/sign-in");
      return;
    }

    handleGetAllCartProducts()
      .then((data) => {
        setCartProducts(data.cart_products);
        setTotal(data.total_price);
        setSelectedRowKeys(
          data.cart_products
            .filter((product) => product.selected === 1)
            .map((product) => product.product_id)
        );
        setSelectedRowKeysPrev(
          data.cart_products
            .filter((product) => product.selected === 1)
            .map((product) => product.product_id)
        );
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

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

    const selectProducts = newlySelectedProducts.map((key) => ({
      product_id: key,
    }));
    handleSelectCartProducts(selectProducts)
      .then((data) => {
        if (data.message) {
          message.error(data.message);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    const deselectedProducts = newlyDeselectedProducts.map((key) => ({
      product_id: key,
    }));
    handleDeselectCartProducts(deselectedProducts)
      .then(() => {
        handleGetAllCartProducts()
          .then((data) => {
            setCartProducts(data.cart_products);
            setTotal(data.total_price);
            setSelectedRowKeys(
              data.cart_products
                .filter((product) => product.selected === 1)
                .map((product) => product.product_id)
            );
            setSelectedRowKeysPrev(
              data.cart_products
                .filter((product) => product.selected === 1)
                .map((product) => product.product_id)
            );
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
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
          handleOk(deletingProduct, setIsModalOpen, setCartProducts, setTotal)
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
              onClick={() => handleCheckOut(router)}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
