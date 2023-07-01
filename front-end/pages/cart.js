import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavigationBar from "./navigation-bar";
import {
  handleCartProductAPI,
  handleCartProductQuantityChangeAPI,
  handleCheckOutAPI,
} from "./api-handlers/cart";
import { columns, generateData } from "./cart-layout-data";
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
    // Call API handler to retrieve cart's data from the database
    handleCartProductAPI()
      .then((data) => {
        setCartProducts(data);

        // Calculate and update the total
        const newTotal = calculateTotal();
        setTotal(newTotal);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [selectedProducts]);

  const handleOk = () => {
    if (deletingProduct) {
      handleCartProductQuantityChangeAPI(deletingProduct.product_id, 0)
        .then(() => {
          handleCartProductAPI()
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

  const handleQuantitySelection = (id, quantity) => {
    if (quantity === 0) {
      // Open the modal to confirm deletion
      setIsModalOpen(true);
      // Set the deletingProduct state to the product being deleted
      const product = cartProducts.find((product) => product.product_id === id);
      setDeletingProduct(product);
    } else {
      handleCartProductQuantityChangeAPI(id, quantity)
        .then(() => {
          // Update the quantity in the frontend state after successful API call
          handleCartProductAPI()
            .then((data) => {
              setCartProducts(data);

              // Update the quantity in the selectedProducts state
              const updatedSelectedProducts = selectedProducts.map(
                (product) => {
                  if (product.key === id) {
                    return { ...product, quantity: quantity };
                  }
                  return product;
                }
              );
              setSelectedProducts(updatedSelectedProducts);

              // Calculate and update the total
              const newTotal = calculateTotal();
              setTotal(newTotal);
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

  const handleProductRedirect = (id) => {
    router.push(`/product/${id}`);
  };

  const data = generateData(
    cartProducts,
    handleProductRedirect,
    handleQuantitySelection
  );

  const calculateTotal = () => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  const handleCheckOut = () => {
    if (selectedProducts.length === 0) {
      message.error("You have not selected any items for checkout");
      return;
    }
    const checkOutData = selectedProducts.map((product) => ({
      product_id: product.key,
    }));
    console.log(checkOutData);

    handleCheckOutAPI(checkOutData)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          router.push({
            pathname: "/check-out",
            query: { checkoutData: JSON.stringify(data) },
          });
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
      <div className={styles.content}>
        <Table
          size="large"
          showHeader={true}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
              setSelectedProducts(selectedRows);
            },
          }}
          tableLayout="fixed"
          pagination={false}
          columns={columns}
          dataSource={data}
          className={styles.table}
        ></Table>

        <Modal
          title="Do you want to remove this item?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{deletingProduct && deletingProduct.product_name}</p>
        </Modal>

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
          <div className={styles.checkoutButton}>
            <Button type="primary" size={"large"} onClick={handleCheckOut}>
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
