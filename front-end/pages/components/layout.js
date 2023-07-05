import styles from "../../styles/cart.module.css";
import { InputNumber, Space } from "antd";

export const cartColumns = [
  {
    title: "Product",
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
  handleQuantitySelection
) => {
  const data = cartProducts.map((product) => ({
    key: product.product_id,
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

  return data;
};

export const checkOutColumns = [
  {
    title: (
      <span
        // style={{ fontFamily: "-apple-system", fontSize: "20px" }}
        className={styles.productsOrderedTitle}
      >
        Products Ordered
      </span>
    ),
    dataIndex: "product",
    width: "500px",
    fontSize: "25px",
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
    title: "Subtotal",
    dataIndex: "totalPrice",
    align: "center",
  },
];

export const handleCheckOutData = (checkOutData) => {
  const data = checkOutData.map((product) => ({
    key: product.product_id,
    product: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{ marginRight: "10px", width: "100px" }}
          src={product.image_url}
          alt={product.product_name}
        />
        <span>{product.product_name}</span>
      </div>
    ),
    price: product.price,
    unitPrice: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price),
    quantity: product.quantity,
    totalPrice: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price * product.quantity),
  }));

  return data;
};
