export const columns = [
  {
    title: <span style={{ fontSize: "25px" }}>Order ID</span>,
    dataIndex: "orderId",
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

export const handleOrderData = (orderData) => {
  const data = orderData.map((product) => ({
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
