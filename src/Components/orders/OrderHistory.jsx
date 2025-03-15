import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  List,
  Card,
  Typography,
  Spin,
  Empty,
  Button,
  Divider,
  Tag,
  Collapse,
  Table,
  message,
  Row,
  Col,
  Badge,
  Space,
} from "antd";
import {
  ShoppingOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  InboxOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EcommerceNavbar from "../EcommerceNavbar";

const { Title, Text } = Typography;
const { Panel } = Collapse;

// Helper function to get authentication headers
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
});

// Format date in a readable format
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get appropriate tag color based on order status
const getStatusTag = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return (
        <Tag icon={<ClockCircleOutlined />} color="orange">
          Pending
        </Tag>
      );
    case "accepted":
      return (
        <Tag icon={<CheckCircleOutlined />} color="green">
          Accepted
        </Tag>
      );
    case "processing":
      return (
        <Tag icon={<ClockCircleOutlined />} color="blue">
          Processing
        </Tag>
      );
    case "shipped":
      return (
        <Tag icon={<InboxOutlined />} color="cyan">
          Shipped
        </Tag>
      );
    case "delivered":
      return (
        <Tag icon={<CheckCircleOutlined />} color="green">
          Delivered
        </Tag>
      );
    case "completed":
      return (
        <Tag icon={<CheckCircleOutlined />} color="green">
          Completed
        </Tag>
      );
    case "cancelled":
      return <Tag color="red">Cancelled</Tag>;
    default:
      return <Tag color="default">Unknown</Tag>;
  }
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const printRef = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/orders/my-orders",
        getAuthHeader()
      );
      setOrders(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load your orders. Please try again.");
      message.error("Could not load your order history.");
    } finally {
      setLoading(false);
    }
  };

  const generateInvoice = (order) => {
    // Create a new window for the invoice
    const invoiceWindow = window.open("", "_blank");

    // Format the invoice HTML
    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice - Order #${order._id.substring(
            order._id.length - 8
          )}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .company-info { text-align: center; margin-bottom: 20px; }
            .invoice-header { text-align: center; margin-bottom: 30px; }
            .order-info { margin-bottom: 20px; }
            .order-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .order-table th, .order-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .order-table th { background-color: #f2f2f2; }
            .order-total { text-align: right; margin-top: 20px; font-weight: bold; }
            .print-btn { 
              background-color: #1890ff; 
              color: white; 
              padding: 10px 20px; 
              border: none; 
              border-radius: 4px; 
              cursor: pointer; 
              font-size: 14px;
              margin-top: 20px;
              transition: background-color 0.3s;
            }
            .print-btn:hover { 
              background-color: #096dd9; 
            }
            .company-logo {
              max-width: 150px;
              margin-bottom: 10px;
            }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="company-info">
            <h2>Wood Crafts</h2>
            <p>Email: contact@dwoodfurniture.com</p>
            <p>Address: 123 Kurunegala, Galagedara</p>
          </div>
          
          <div class="invoice-header">
            <h1>INVOICE</h1>
            <p>Order #${order._id.substring(order._id.length - 8)}</p>
          </div>
          
          <div class="order-info">
            <p><strong>Date:</strong> ${formatDate(order.createdAt)}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
          
          <h2>Order Items</h2>
          <table class="order-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map((item) => {
                  const itemPrice =
                    item.furniture.basePrice *
                    (item.woodType?.priceMultiplier || 1);
                  return `
                      <tr>
                        <td>${item.furniture.name} ${
                    item.woodType ? `(${item.woodType.name})` : ""
                  }</td>
                        <td>Rs${itemPrice.toFixed(2)}</td>
                        <td>${item.quantity}</td>
                        <td>Rs${(itemPrice * item.quantity).toFixed(2)}</td>
                      </tr>
                    `;
                })
                .join("")}
            </tbody>
          </table>
          
          <div class="order-total">
            <p>Total Amount: Rs${order.items
              .reduce((sum, item) => {
                const itemPrice =
                  item.furniture.basePrice *
                  (item.woodType?.priceMultiplier || 1);
                return sum + itemPrice * item.quantity;
              }, 0)
              .toFixed(2)}</p>
          </div>

          
          
          <div style="text-align: center;">
            <button class="print-btn" onclick="window.print(); return false;">Print Invoice</button>
          </div>
        </body>
      </html>
    `;

    invoiceWindow.document.open();
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
  };

  const renderOrderItems = (items) => {
    const columns = [
      {
        title: "Product",
        dataIndex: "product",
        key: "product",
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {record.furniture.imageUrl && (
              <img
                src={record.furniture.imageUrl}
                alt={record.furniture.name}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 10,
                  objectFit: "cover",
                }}
              />
            )}
            <div>
              <Text strong>{record.furniture.name}</Text>
              {record.woodType && (
                <div>
                  <Text type="secondary">Wood: {record.woodType.name}</Text>
                </div>
              )}
            </div>
          </div>
        ),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (_, record) => {
          const calculatedPrice =
            record.furniture.basePrice *
            (record.woodType?.priceMultiplier || 1);
          return <Text>Rs{calculatedPrice.toFixed(2)}</Text>;
        },
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Total",
        key: "total",
        render: (_, record) => {
          const calculatedPrice =
            record.furniture.basePrice *
            (record.woodType?.priceMultiplier || 1);
          return (
            <Text strong>
              Rs{(calculatedPrice * record.quantity).toFixed(2)}
            </Text>
          );
        },
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="_id"
      />
    );
  };

  if (loading) {
    return (
      <div className="site-container">
        <EcommerceNavbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 100px)",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Spin size="large" />
          <Text>Loading your order history...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="site-container">
        <EcommerceNavbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "100px 20px",
            gap: "20px",
          }}
        >
          <Title level={3} style={{ color: "#ff4d4f" }}>
            Error Loading Orders
          </Title>
          <Text>{error}</Text>
          <Button type="primary" onClick={fetchOrders}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="site-container">
      <EcommerceNavbar />
      <div
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "20px auto",
          backgroundColor: "#f9f9f9",
          minHeight: "calc(100vh - 200px)",
          borderRadius: "8px",
        }}
      >
        <Title level={2}>
          <ShoppingOutlined style={{ marginRight: 10 }} />
          My Orders
        </Title>
        <Divider />

        {orders.length === 0 ? (
          <Empty
            description={
              <span style={{ fontSize: "16px" }}>
                You haven't placed any orders yet
              </span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" size="large" onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </Empty>
        ) : (
          <List
            dataSource={orders}
            renderItem={(order) => (
              <Card
                key={order._id}
                style={{ marginBottom: 20 }}
                title={
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text strong>
                        Order #{order._id.substring(order._id.length - 8)}
                      </Text>
                    </Col>
                    <Col>
                      <Space>
                        {getStatusTag(order.status)}
                        <Button
                          type="primary"
                          icon={<PrinterOutlined />}
                          style={{
                            background: "#389e0d",
                            borderColor: "#389e0d",
                            boxShadow: "0 2px 0 rgba(0, 0, 0, 0.045)",
                            transition: "all 0.3s",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            generateInvoice(order);
                          }}
                        >
                          Print Invoice
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                }
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Text type="secondary">Ordered on: </Text>
                    <Text strong>{formatDate(order.createdAt)}</Text>
                    {order.deliveryDate && (
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">Delivery date: </Text>
                        <Text strong>{formatDate(order.deliveryDate)}</Text>
                      </div>
                    )}
                  </Col>
                  <Col xs={24} sm={12} style={{ textAlign: "right" }}>
                    <Text type="secondary">Total: </Text>
                    <Text strong style={{ fontSize: "18px" }}>
                      Rs
                      {order.items
                        .reduce((sum, item) => {
                          const itemPrice =
                            item.furniture.basePrice *
                            (item.woodType?.priceMultiplier || 1);
                          return sum + itemPrice * item.quantity;
                        }, 0)
                        .toFixed(2)}
                    </Text>
                  </Col>
                </Row>

                <Divider style={{ margin: "12px 0" }} />

                <Collapse ghost>
                  <Panel header="View order details" key="1">
                    {renderOrderItems(order.items)}

                    {order.description && (
                      <div style={{ marginTop: 16 }}>
                        <Text type="secondary">Notes: </Text>
                        <Text>{order.description}</Text>
                      </div>
                    )}
                  </Panel>
                </Collapse>
              </Card>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
