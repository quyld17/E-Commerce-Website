import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavigationBar from "./navigation-bar";
import handleCartProductAPI from "./api-handlers/cart";
import handleCartProductQuantityChangeAPI from "./api-handlers/cart-product-quantity-change";
import styles from "../styles/cart.module.css";

import { Button, InputNumber, Table, Space, Modal } from "antd";

const columns = [
  {
    title: "Product",
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
    title: "Total Price",
    dataIndex: "totalPrice",
    align: "center",
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "center",
  },
];

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Call API handler to retrieve cart's data from the database
    handleCartProductAPI()
      .then((data) => {
        setCartProducts(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

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

  const data = cartProducts.map((product, index) => ({
    key: index,
    product: (
      <div className={styles.productThumbnailAndName}>
        <img
          className={styles.productThumbnail}
          src={product.image_url}
          alt={product.product_name}
          onClick={() => handleProductRedirect(product.product_id)}
        />
        <span
          className={styles.productName}
          onClick={() => handleProductRedirect(product.product_id)}
        >
          {product.product_name}
        </span>
      </div>
    ),
    unitPrice: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price),
    quantity: (
      <InputNumber
        min={0}
        max={product.in_stock_quantity}
        defaultValue={product.quantity}
        value={product.quantity}
        onChange={(quantity) =>
          handleQuantitySelection(product.product_id, quantity)
        }
      />
    ),
    totalPrice: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price * product.quantity),
    action: (
      <Space size="middle">
        <a onClick={() => handleQuantitySelection(product.product_id, 0)}>
          Delete
        </a>
      </Space>
    ),
  }));

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
          rowSelection={true}
          tableLayout="fixed"
          pagination={{
            position: ["topLeft", "bottomLeft"],
          }}
          columns={columns}
          dataSource={data}
        />

        <Modal
          title="Do you want to remove this item?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{deletingProduct && deletingProduct.product_name}</p>
        </Modal>

        <div className={styles.checkoutBar}>
          <div className={styles.checkoutBarSubtotal}>
            <p>Subtotal:</p>
            <p></p>
          </div>
          <div className={styles.checkoutBarShippingToTal}>
            <p>Shipping Total:</p>
            <p>
              {Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
              }).format("30000")} 
            </p>
          </div>
          <div className={styles.checkoutBarTotal}>
            <p>Total:</p>
            <p>
              {/* {Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)} */}
            </p>
          </div>
          <div className={styles.checkoutButton}>
            <Button type="primary" size={"large"}>
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
