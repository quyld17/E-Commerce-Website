import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { handleGetAllProductsAPI } from "../api/handlers/products";
import { handleAddToCartAPI } from "../api/handlers/cart";

import styles from "../styles/products-display.module.css";
import { Card, Button, message, Pagination } from "antd";
const { Meta } = Card;

export default function ProductsDisplay() {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [numOfProds, setNumOfProds] = useState(0);
  const router = useRouter();

  const currentPage = parseInt(router.query.page) || 1;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    handleGetAllProductsAPI(currentPage)
      .then((data) => {
        setProducts(data.products);
        setNumOfProds(data.num_of_prods);
      })
      .catch((error) => {
        console.log("Error getting delivery address: ", error);
      });
  }, [currentPage]);

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
      .then(() => {
        message.success("Add product to cart successfully!");
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handlePageChange = (page) => {
    router.push(`?page=${page}`);
  };

  return (
    <div>
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
      <Pagination
        defaultCurrent={1}
        pageSize={5}
        total={numOfProds}
        current={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
