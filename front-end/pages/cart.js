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
import styles from "../styles/cart.module.css";

import { Button, Table, Modal, message } from "antd";

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
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
          // Update the quantity state after successful API call
          const updatedCartProducts = cartProducts.map((product) => {
            if (product.product_id === id) {
              return { ...product, quantity: quantity };
            }
            return product;
          });
          setCartProducts(updatedCartProducts);

          // Update the quantity in the selectedProducts state
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

  const handleOk = () => {
    if (deletingProduct) {
      const updatedSelectedProducts = selectedProducts.filter(
        (product) => product.product_id !== deletingProduct.product_id
      );
      setSelectedProducts(updatedSelectedProducts);

      handleAdjustCartProductQuantity(deletingProduct.product_id, 0)
        .then(() => {
          handleGetAllCartProducts()
            .then((data) => {
              setCartProducts(data);
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProductRedirect = (id) => {
    router.push(`/product/${id}`);
  };

  const data = cartData(
    cartProducts,
    handleProductRedirect,
    handleQuantitySelection
  );

  const handleCheckOut = () => {
    if (selectedProducts.length === 0) {
      message.error("You have not selected any items for checkout");
      return;
    }

    handleGetCartSelectedProducts(selectedProducts)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          localStorage.setItem(
            "products",
            JSON.stringify(data.retrievedProducts)
          );
          router.push("/check-out");
        }
      })
      .catch((error) => {
        console.log("Error during checkout:", error);
      });
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
        onOk={handleOk}
        onCancel={handleCancel}
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
              const selectedProductIds = selectedRows.map((row) => ({
                product_id: row.key,
              }));
              setSelectedProducts(selectedProductIds);
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
              onClick={handleCheckOut}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
