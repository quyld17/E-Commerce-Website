import { useState, useEffect } from "react";
import handleProductShowcaseAPI from "./api-handlers/product-showcase";
import Link from "next/link";
import styles from "../styles/product-showcase.module.css";
import { Card, Button } from "antd";
const { Meta } = Card;

export default function ProductShowcase() {
  // Declare states to store received data
  const [products, setProducts] = useState([]);

  // Call API handler
  useEffect(() => {
    handleProductShowcaseAPI(setProducts);
  }, []);

  return (
    <div className={styles.overall}>
      {products.map((product, index) => (
        <Link href="/product-details" key={index} className={styles.card}>
          <Card
            hoverable
            cover={<img alt="Image ${index}" src={product.image_url}></img>}
          >
            <Meta
              title={product.product_name}
              description={
                <div>
                  Price: {product.price} VNĐ
                  <Button type="primary" className={styles.addToCartButton}>
                    Add to cart
                  </Button>
                </div>
              }
            />
          </Card>
        </Link>
      ))}
    </div>
  );
}
