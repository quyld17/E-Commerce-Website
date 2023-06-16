import { useState, useEffect } from "react";
import { Card } from "antd";
const { Meta } = Card;

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/images")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {products.map((product, index) => (
        <Card
          key={index}
          hoverable
          style={{
            width: "200px",
            height: "auto",
            margin: "20px",
          }}
          cover={<img alt="Image ${index}" src={product.image_url}></img>}
        >
          <Meta
            title={product.product_name}
            description={`Price: ${product.price} VNĐ`}
          ></Meta>
        </Card>
      ))}
    </div>
  );
}
