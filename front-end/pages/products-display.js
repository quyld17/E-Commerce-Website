import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { handleGetAllProductsAPI } from "./api-handlers/products";
import { handleAddToCartAPI } from "./api-handlers/cart";

import styles from "../styles/product-showcase.module.css";
import { Card, Button, message } from "antd";
const { Meta } = Card;

export default function ProductsDisplay() {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    handleGetAllProductsAPI(setProducts);
  }, []);

  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };

  const handleAddToCartClick = (event, id) => {
    event.stopPropagation();

    if (token === null) {
      message.info("Please sign in to continue");
      return;
    }

    handleAddToCartAPI(id, 1)
      .then((data) => {
        if (data.error) {
          message.error("Add product to cart unsuccessfully! Please try again");
        } else {
          message.success("Add product to cart successfully!");
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  return (
    <div className={styles.overall}>
      {products.map((product) => (
        <Card
          className={styles.card}
          hoverable
          cover={<img alt="Image ${index}" src={product.image_url}></img>}
          key={product.product_id}
          onClick={() => handleClick(product.product_id)}
        >
          <Meta
            title={product.product_name}
            description={
              <div>
                Price:{" "}
                {Intl.NumberFormat("vi-VI", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
                <Button
                  type="primary"
                  className={styles.addToCartButton}
                  onClick={(event) =>
                    handleAddToCartClick(event, product.product_id)
                  }
                >
                  Add to cart
                </Button>
              </div>
            }
          ></Meta>
        </Card>
      ))}
    </div>
  );
}
