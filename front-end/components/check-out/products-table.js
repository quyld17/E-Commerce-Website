export const checkOutColumns = [
  {
    title: <span style={{ fontSize: "25px" }}>Products</span>,
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
