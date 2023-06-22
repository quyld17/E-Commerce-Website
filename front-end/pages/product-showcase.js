import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import handleProductShowcaseAPI from "./api-handlers/product-showcase";
import handleProductDetailAPI from "./api-handlers/product-detail";

import styles from "../styles/product-showcase.module.css";
import { Card, Button } from "antd";
const { Meta } = Card;

export default function ProductShowcase({ sortingKey }) {
  // Declare states to store received data
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Call API handler to retrieve data from database and set it to products
  useEffect(() => {
    handleProductShowcaseAPI(setProducts);
  }, []);

  // Redirect to product's detail page when user clicks on a product
  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };

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

    return products.map((product) => (
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
              <Button type="primary" className={styles.addToCartButton}>
                Add to cart
              </Button>
            </div>
          }
        ></Meta>
      </Card>
    ));
  };

  return <div className={styles.overall}>{productsDisplay()}</div>;
}
