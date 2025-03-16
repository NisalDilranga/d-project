import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  message,
  Space,
  Popconfirm,
  Select,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";

const WoodsTab = () => {
  const [woods, setWoods] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWood, setEditingWood] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
  });

  const fetchWoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/woods");
      setWoods(response.data);
    } catch (error) {
      message.error("Failed to fetch woods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWoods();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (editingWood) {
        await axios.put(
          `http://localhost:3000/api/woods/${editingWood._id}`,
          values,
          getAuthHeader()
        );
        message.success("Wood type updated successfully!");
      } else {
        await axios.post(
          "http://localhost:3000/api/woods",
          values,
          getAuthHeader()
        );
        message.success("Wood type added successfully!");
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingWood(null);
      fetchWoods();
    } catch (error) {
      message.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (woodId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/woods/${woodId}`,
        getAuthHeader()
      );
      message.success("Wood type deleted successfully!");
      fetchWoods();
    } catch (error) {
      message.error("Failed to delete wood type");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price Multiplier",
      dataIndex: "priceMultiplier",
      key: "priceMultiplier",
    },
    {
      title: "Available",
      dataIndex: "availability",
      key: "availability",
      render: (availability) => <Switch checked={availability} disabled />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingWood(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Delete wood type"
            description="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Filtered woods based on search and filter
  const filteredWoods = woods.filter((wood) => {
    const nameMatch = wood.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const availabilityMatch =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && wood.availability) ||
      (availabilityFilter === "unavailable" && !wood.availability);

    return nameMatch && availabilityMatch;
  });

  return (
    <>
      <Row gutter={16} className="mb-4">
        <Col xs={24} sm={12} md={8} lg={8}>
          <Input.Search
            placeholder="Search by wood name"
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Select
            placeholder="Filter by availability"
            style={{ width: "100%" }}
            value={availabilityFilter}
            onChange={(value) => setAvailabilityFilter(value)}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="unavailable">Not Available</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className="flex justify-end">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingWood(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add Wood Type
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredWoods}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingWood ? "Edit Wood Type" : "Add Wood Type"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingWood(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter wood type name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="priceMultiplier"
            label="Price Multiplier"
            rules={[
              { required: true, message: "Please enter price multiplier" },
            ]}
          >
            <Input type="number" step="0.1" />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Available"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingWood ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default WoodsTab;
