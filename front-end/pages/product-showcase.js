import { useState, useEffect } from "react";
import handleProductShowcaseAPI from "./api-handlers/product-showcase";
import Link from "next/link";
import styles from "../styles/product-showcase.module.css";
import { Card, Button } from "antd";
const { Meta } = Card;

export default function ProductShowcase({ sortingKey }) {
  // Declare states to store received data
  const [products, setProducts] = useState([]);

  // Call API handler to retrieve data from database and set it to products
  useEffect(() => {
    handleProductShowcaseAPI(setProducts);
  }, []);

  const productsDisplay = () => {
    if (sortingKey === 1) {
      products.sort((a, b) => b.price - a.price);
    } else if (sortingKey === 2) {
      products.sort((a, b) => a.price - b.price);
    } else if (sortingKey === 3) {
      products.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortingKey === 4) {
      products.sort((a, b) => b.product_name.localeCompare(a.product_name));
    }
    // else if (sortingKey > 4) {

    // }

    return products.map((product, index) => (
      <Link href="/product-details" key={index} className={styles.card}>
        <Card
          hoverable
          cover={<img alt="Image ${index}" src={product.image_url}></img>}
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
                <Button type="primary" className={styles.addToCartButton}>
                  Add to cart
                </Button>
              </div>
            }
          ></Meta>
        </Card>
      </Link>
    ));
  };

  return <div className={styles.overall}>{productsDisplay()}</div>;
}
