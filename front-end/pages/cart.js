import { useEffect, useState } from "react";
import Head from "next/head";
import NavigationBar from "./navigation-bar";
import handleCartItemAPI from "./api-handlers/cart";
import styles from "../styles/cart.module.css";

import { Checkbox, Button } from "antd";

export default function CartPage() {
  //   const [products, setProducts] = useState(null);
  const [totalPricePerProduct, setTotalPricePerProduct] = useState();

  const products = [
    {
      name: "Nike Invincible 3 Obsidian",
      price: "5279000",
      image:
        "https://storage.googleapis.com/ecw-product-images/0a883b6f-1a3c-42d7-943e-a2e4a4107b18.webp",
      quantity: 2,
    },
    {
      name: "Nike Invincible 3 Obsidian",
      price: "5279000",
      image:
        "https://storage.googleapis.com/ecw-product-images/0a883b6f-1a3c-42d7-943e-a2e4a4107b18.webp",
      quantity: 2,
    },
  ];
  useEffect(() => {
    setTotalPricePerProduct(products[0].price * products[0].quantity);
  });

  //   useEffect(() => {
  //     // Retrieve the JWT token from local storage
  //     const token = localStorage.getItem("token");

  //     // Call API handler to retrieve cart's data from database
  //     handleCartItemAPI(token);
  //   }, []);

  return (
    <div className={styles.layout}>
      <Head>
        <title>Cart</title>
      </Head>
      <NavigationBar />
      <div className={styles.content}>
        <div className={styles.titleBar}>
          <div className={styles.titleBarAllProductsCheckbox}>
            <Checkbox>
              <p>Product </p>
            </Checkbox>
          </div>

          <p>Unit Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
          <p>Action</p>
        </div>
        <hr />
        <div className={styles.productSection}>
          {products.map((product, index) => (
            <div className={styles.productDetail} key={index}>
              <div className={styles.productNameAndThumbnail}>
                <Checkbox className={styles.productCheckbox} />
                <img
                  className={styles.productThumbnail}
                  alt="Thumbnail"
                  src={product.image}
                />
                <p>{product.name} </p>
              </div>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
              <p
              // onChange={() =>
              //   handleTotalPricePerProduct(product.price, product.quantity)
              // }
              >
                {totalPricePerProduct}
              </p>
              <p>Delete</p>
            </div>
          ))}
        </div>
        <hr />
        <div className={styles.checkoutBar}>
          <div className={styles.checkoutBarSubtotal}>
            <p>Subtotal:</p>
            <p></p>
          </div>
          <div className={styles.checkoutBarShippingToTal}>
            <p>Shipping Total:</p>
            <p></p>
          </div>
          <div className={styles.checkoutBarTotal}>
            <p>Total: </p>
            <p></p>
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
