import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Popconfirm,
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

const FurnitureTab = () => {
  const [furniture, setFurniture] = useState([]);
  const [categories, setCategories] = useState([]);
  const [woods, setWoods] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFurniture, setEditingFurniture] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Search and filter states
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [furnitureRes, categoriesRes, woodsRes] = await Promise.all([
        axios.get("http://localhost:3000/api/furniture"),
        axios.get("http://localhost:3000/api/categories"),
        axios.get("http://localhost:3000/api/woods"),
      ]);
      setFurniture(furnitureRes.data);
      setCategories(categoriesRes.data);
      setWoods(woodsRes.data);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Check for duplicate name in same category
      const isDuplicate = furniture.some(
        (f) =>
          f.name.toLowerCase() === values.name.toLowerCase() &&
          f.category._id === values.category &&
          (!editingFurniture || f._id !== editingFurniture._id) // Exclude current item when editing
      );

      if (isDuplicate) {
        message.error(
          "A furniture with this name already exists in the selected category"
        );
        return;
      }

      const data = {
        ...values,
        woodTypes: values.woodTypes.map((woodId) => ({
          woodType: woodId,
          priceMultiplier:
            woods.find((w) => w._id === woodId)?.priceMultiplier || 1,
        })),
      };

      if (editingFurniture) {
        await axios.put(
          `http://localhost:3000/api/furniture/${editingFurniture._id}`,
          data,
          getAuthHeader()
        );
        message.success("Furniture updated successfully!");
      } else {
        await axios.post(
          "http://localhost:3000/api/furniture",
          data,
          getAuthHeader()
        );
        message.success("Furniture added successfully!");
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingFurniture(null);
      fetchData();
    } catch (error) {
      message.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (furnitureId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/furniture/${furnitureId}`,
        getAuthHeader()
      );
      message.success("Furniture deleted successfully!");
      fetchData();
    } catch (error) {
      message.error("Failed to delete furniture");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="Furniture"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
          {category?.name || "Unknown"}
        </span>
      ),
    },
    {
      title: "Wood Types",
      dataIndex: "woodTypes",
      key: "woodTypes",
      render: (woodTypes) => (
        <div className="flex flex-wrap gap-1">
          {woodTypes.map((wt) => {
            if (wt.woodType) {
              return (
                <span
                  key={wt._id}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                >
                  {wt.woodType.name} (x{wt.priceMultiplier})
                </span>
              );
            }
            return null;
          })}
        </div>
      ),
    },
    {
      title: "Base Price",
      dataIndex: "basePrice",
      key: "basePrice",
      render: (price) => (
        <span className="font-medium">Rs {price.toFixed(2)}</span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock) => (
        <span className={`font-medium ${stock <= 5 ? "text-red-500" : ""}`}>
          {stock || 0}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Image URL",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Image
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete furniture"
            description="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingFurniture(record);
    form.setFieldsValue({
      name: record.name,
      category: record.category._id,
      basePrice: record.basePrice,
      stock: record.stock || 0,
      description: record.description,
      imageUrl: record.imageUrl,
      woodTypes: record.woodTypes
        .filter((wt) => wt.woodType) // Filter out any invalid wood types
        .map((wt) => wt.woodType._id),
    });
    setIsModalVisible(true);
  };

  // Filtered furniture based on search and filters
  const filteredFurniture = furniture.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const categoryMatch =
      categoryFilter === "all" ||
      (item.category && item.category._id === categoryFilter);
    const stockMatch =
      stockFilter === "all" ||
      (stockFilter === "inStock" && item.stock > 0) ||
      (stockFilter === "outOfStock" && item.stock === 0) ||
      (stockFilter === "lowStock" && item.stock > 0 && item.stock <= 5);

    return nameMatch && categoryMatch && stockMatch;
  });

  return (
    <>
      <div className="mb-6">
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} md={8}>
            <Input.Search
              placeholder="Search furniture by name"
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={(value) => setSearchText(value)}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              placeholder="Filter by category"
              style={{ width: "100%" }}
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(value)}
            >
              <Select.Option value="all">All Categories</Select.Option>
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Select
              placeholder="Filter by stock"
              style={{ width: "100%" }}
              value={stockFilter}
              onChange={(value) => setStockFilter(value)}
            >
              <Select.Option value="all">All Stock Levels</Select.Option>
              <Select.Option value="inStock">In Stock</Select.Option>
              <Select.Option value="outOfStock">Out of Stock</Select.Option>
              <Select.Option value="lowStock">Low Stock (≤ 5)</Select.Option>
            </Select>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col span={24} className="flex justify-end">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingFurniture(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Add Furniture
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={filteredFurniture}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingFurniture ? "Edit Furniture" : "Add Furniture"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingFurniture(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="basePrice"
            label="Base Price"
            rules={[{ required: true }]}
          >
            <Input type="number" prefix="Rs " />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock Quantity"
            rules={[
              { required: true, message: "Please input stock quantity!" },
            ]}
            initialValue={0}
          >
            <Input type="number" min={0} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item
            name="woodTypes"
            label="Available Wood Types"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              {woods.map((wood) => (
                <Select.Option key={wood._id} value={wood._id}>
                  {wood.name} (x{wood.priceMultiplier})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingFurniture ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FurnitureTab;
