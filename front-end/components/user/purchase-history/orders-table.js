import { Table, Badge } from "antd";

export const columns = [
  {
    title: <span style={{ fontSize: "25px" }}>Order ID</span>,
    dataIndex: "orderID",
    fontSize: "25px",
    align: "center",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    align: "center",
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    align: "center",
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    align: "center",
  },
  {
    title: "Delivery Status",
    dataIndex: "deliveryStatus",
    align: "center",
  },
];

export const handleOrderData = (orders) => {
  const data = orders.map((order) => ({
    key: order.order_id,
    orderID: <p>#{order.order_id}</p>,
    orderDate: order.created_at,
    totalPrice: (
      <p>
        {Intl.NumberFormat("vi-VI", {
          style: "currency",
          currency: "VND",
        }).format(order.total_price)}
      </p>
    ),
    paymentMethod: order.payment_method,
    deliveryStatus: <Badge status="processing" text={order.status} />,
  }));

  return data;
};

export const handleOrderDetails = (record, orderProducts) => {
  const orderDetailsColumns = [
    {
      title: "Product",
      dataIndex: "product",
      fontSize: "25px",
      width: "300px",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      align: "center",
    },
  ];

  const filteredOrderProducts = orderProducts.filter(
    (product) => product.order_id === record.key
  );

  const data = filteredOrderProducts.map((product) => ({
    key: product.order_id,
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
    quantity: product.quantity,
    price: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price),
    subtotal: Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(product.price * product.quantity),
  }));

  return (
    <Table
      showHeader={true}
      tableLayout="fixed"
      pagination={false}
      columns={orderDetailsColumns}
      dataSource={data}
    ></Table>
  );
};
