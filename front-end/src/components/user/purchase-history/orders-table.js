import Link from "next/link";
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

export const handleOrders = (orders) => {
  let badgeStatus = "default";
  let data;
  if (!orders) {
    return data;
  }
  data = orders.map((order) => {
    switch (order.status) {
      case "Delivering":
        badgeStatus = "processing";
        break;
      case "Delivered":
        badgeStatus = "success";
        break;
      case "Canceled":
        badgeStatus = "error";
        break;
      default:
        break;
    }

    return {
      key: order.order_id,
      orderID: <p>#{order.order_id}</p>,
      orderDate: order.created_at_display,
      totalPrice: (
        <p>
          {Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "VND",
          }).format(order.total_price)}
        </p>
      ),
      paymentMethod: order.payment_method,
      deliveryStatus: <Badge status={badgeStatus} text={order.status} />,
    };
  });

  return data;
};

export const handleOrderProducts = (record, orders) => {
  const orderDetailsColumns = [
    {
      title: <span style={{ fontSize: "20px" }}>Products</span>,
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

  const matchedOrder = orders.find((order) => order.order_id === record.key);

  const data = matchedOrder.products.map((product) => ({
    key: product.product_id,
    product: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href={`/product/${product.product_id}`}>
          <img
            style={{ marginRight: "10px", width: "100px" }}
            src={product.image_url}
            alt={product.product_name}
          />
        </Link>
        <Link href={`/product/${product.product_id}`}>
          <span>{product.product_name}</span>
        </Link>
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
