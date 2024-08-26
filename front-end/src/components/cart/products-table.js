import { useRouter } from "next/router";
import styles from "../../styles/cart.module.css";
import { InputNumber, Space } from "antd";

export const cartColumns = [
  {
    title: <span style={{ fontSize: "25px" }}>Products</span>,
    dataIndex: "product",
    width: "400px",
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    align: "center",
  },
  {
    title: "Quantity",
    dataIndex: "quantityDisplay",
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

export const cartData = (
  cartProducts,
  handleProductRedirect,
  adjustedQuantityHandler,
  router
) => {
  let data;
  if (!cartProducts) {
    return data;
  }
  data = cartProducts.map((product) => ({
    key: product.product_id,
    product: (
      <div className={styles.productThumbnailAndName}>
        <img
          className={styles.productThumbnail}
          src={product.image_url}
          alt={product.product_name}
          onClick={() => handleProductRedirect(product.product_id, router)}
        />
        <span
          className={styles.productName}
          onClick={() => handleProductRedirect(product.product_id, router)}
        >
          {product.product_name}
        </span>
      </div>
    ),
    price: product.price,
    unitPrice: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price),
    quantity: product.quantity,
    quantityDisplay: (
      <InputNumber
        min={0}
        max={product.in_stock_quantity}
        defaultValue={product.quantity}
        value={product.quantity}
        onChange={(quantity) =>
          adjustedQuantityHandler(product.product_id, quantity)
        }
      />
    ),
    totalPrice: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price * product.quantity),
    action: (
      <Space size="middle">
        <a
          className={styles.deleteButton}
          onClick={() => adjustedQuantityHandler(product.product_id, 0)}
        >
          Delete
        </a>
      </Space>
    ),
  }));

  return data;
};

// Usage in a React component
const YourComponent = ({ cartProducts, handleProductRedirect, adjustedQuantityHandler }) => {
  const router = useRouter();

  const data = cartData(cartProducts, handleProductRedirect, adjustedQuantityHandler, router);

  // Render your table or other components using the `data`
};
