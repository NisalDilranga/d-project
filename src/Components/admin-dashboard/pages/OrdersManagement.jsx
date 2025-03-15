import { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
  Tabs,
  Popconfirm,
  Form,
  Input,
  DatePicker,
} from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
  });

  const fetchOrders = async (status = "") => {
    try {
      setLoading(true);
      let url = "http://localhost:3000/api/orders";

      if (status === "shipped") {
        url = "http://localhost:3000/api/orders/status/shipped";
      } else if (status === "delivered") {
        url = "http://localhost:3000/api/orders/status/delivered";
      } else if (status) {
        url = `http://localhost:3000/api/orders/status/${status}`;
      }

      const response = await axios.get(url, getAuthHeader());
      setOrders(response.data);
    } catch (error) {
      message.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (values) => {
    try {
      const data = {
        status: values.status,
        description: values.description,
      };

      // Add delivery date if status is "accepted"
      if (values.status === "accepted") {
        if (!values.deliveryDate) {
          message.error("Delivery date is required when accepting an order");
          return;
        }
        data.deliveryDate = values.deliveryDate.format("YYYY-MM-DD");
      }

      await axios.put(
        `http://localhost:3000/api/orders/${selectedOrder._id}/status`,
        data,
        getAuthHeader()
      );
      message.success("Order status updated successfully");
      setStatusModalVisible(false);
      form.resetFields();
      fetchOrders();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/orders/${orderId}`,
        getAuthHeader()
      );
      message.success("Order deleted successfully");
      fetchOrders();
    } catch (error) {
      message.error("Failed to delete order");
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <span className="font-mono text-sm">{id}</span>,
    },
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <span>{user?.name || user?.email || "Unknown Customer"}</span>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => <span>{items?.length || 0} items</span>,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => <span>Rs {amount?.toFixed(2)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          pending: "gold",
          accepted: "green",
          rejected: "red",
          shipped: "blue",
          delivered: "purple",
        };
        return (
          <Tag color={colors[status]} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setDetailsModalVisible(true);
            }}
          />
          <Button
            onClick={() => {
              setSelectedOrder(record);
              setStatusModalVisible(true);
            }}
          >
            Update Status
          </Button>
          <Popconfirm
            title="Delete order"
            description="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: "all",
      label: "All Orders",
      children: <Table columns={columns} dataSource={orders} rowKey="_id" />,
    },
    {
      key: "pending",
      label: "Pending",
      children: (
        <Table
          columns={columns}
          dataSource={orders.filter((o) => o.status === "pending")}
          rowKey="_id"
        />
      ),
    },
    {
      key: "accepted",
      label: "Accepted",
      children: (
        <Table
          columns={columns}
          dataSource={orders.filter((o) => o.status === "accepted")}
          rowKey="_id"
        />
      ),
    },
    {
      key: "rejected",
      label: "Rejected",
      children: (
        <Table
          columns={columns}
          dataSource={orders.filter((o) => o.status === "rejected")}
          rowKey="_id"
        />
      ),
    },
    {
      key: "shipped",
      label: "Shipped",
      children: (
        <Table
          columns={columns}
          dataSource={orders.filter((o) => o.status === "shipped")}
          rowKey="_id"
        />
      ),
    },
    {
      key: "delivered",
      label: "Delivered",
      children: (
        <Table
          columns={columns}
          dataSource={orders.filter((o) => o.status === "delivered")}
          rowKey="_id"
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Orders Management</h1>
      </div>

      <Tabs
        defaultActiveKey="all"
        items={tabItems}
        onChange={(key) => {
          if (key === "all") fetchOrders();
          else fetchOrders(key);
        }}
      />

      {/* Order Details Modal */}
      <Modal
        title="Order Details"
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Customer Information</h3>
                <p>Name: {selectedOrder.user?.name}</p>
                <p>Email: {selectedOrder.user?.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Order Information</h3>
                <p>Status: {selectedOrder.status.toUpperCase()}</p>
                <p>Total: Rs {selectedOrder.totalAmount?.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Items</h3>
              <Table
                dataSource={selectedOrder.items}
                columns={[
                  {
                    title: "Item",
                    dataIndex: "furniture",
                    render: (furniture) => furniture?.name,
                  },
                  {
                    title: "Wood Type",
                    dataIndex: "woodType",
                    render: (woodType) => woodType?.name,
                  },
                  {
                    title: "Quantity",
                    dataIndex: "quantity",
                  },
                  {
                    title: "Price",
                    dataIndex: "price",
                    render: (price) => `Rs ${price?.toFixed(2)}`,
                  },
                ]}
                pagination={false}
                rowKey="_id"
              />
            </div>
            {selectedOrder.description && (
              <div>
                <h3 className="font-semibold">Additional Notes</h3>
                <p>{selectedOrder.description}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Status Update Modal */}
      <Modal
        title="Update Order Status"
        open={statusModalVisible}
        onCancel={() => {
          setStatusModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleStatusUpdate}
          layout="vertical"
          onValuesChange={(changedValues) => {
            if (changedValues.status) {
              form.setFieldsValue({ deliveryDate: undefined });
            }
          }}
          initialValues={{
            status: selectedOrder?.status || "pending",
          }}
        >
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <select className="w-full border rounded p-2">
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </Form.Item>

          {/* Add Delivery Date field that only shows when status is "accepted" */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues?.status !== currentValues?.status
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("status") === "accepted" && (
                <Form.Item
                  name="deliveryDate"
                  label="Delivery Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select a delivery date",
                    },
                  ]}
                >
                  <DatePicker
                    className="w-full"
                    disabledDate={(current) => {
                      return current && current.valueOf() < Date.now();
                    }}
                  />
                </Form.Item>
              )
            }
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={4}
              placeholder="Add a note about this status change"
            />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setStatusModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update Status
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrdersManagement;
