import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Typography,
  Divider,
  Button,
  Radio,
  InputNumber,
  Descriptions,
  Tag,
  Breadcrumb,
  Spin,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useCart } from "react-use-cart";
import EcommerceNavbar from "../Components/EcommerceNavbar";

const { Title, Paragraph, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedWoodType, setSelectedWoodType] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // First try to use product passed from location state, if not fetch it
  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      setLoading(false);
      // Set default selected wood type if available
      if (location.state.product.woodTypes?.length > 0) {
        setSelectedWoodType(location.state.product.woodTypes[0]);
      }
    } else {
      fetchProductDetails();
    }
  }, [id, location.state]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/furniture/${id}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      setProduct(data);

      // Set default selected wood type if available
      if (data.woodTypes?.length > 0) {
        setSelectedWoodType(data.woodTypes[0]);
      }
    } catch (error) {
      message.error(error.message || "Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const price = selectedWoodType
      ? product.basePrice * selectedWoodType.priceMultiplier
      : product.basePrice;

    addItem({
      id: selectedWoodType
        ? `${product._id}-${selectedWoodType.woodType._id}`
        : product._id,
      name: product.name,
      price: price,
      quantity: quantity,
      imageUrl: product.imageUrl,
      woodType: selectedWoodType?.woodType?.name || "Standard",
    });

    message.success(`${product.name} added to cart`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    message.success(
      isFavorite
        ? `${product.name} removed from favorites`
        : `${product.name} added to favorites`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <EcommerceNavbar />
        <div
          className="flex justify-center items-center"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Spin size="large" tip="Loading product details..." />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <EcommerceNavbar />
        <div className="container mx-auto p-4 text-center">
          <Title level={3}>Product not found</Title>
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const calculatedPrice = selectedWoodType
    ? (product.basePrice * selectedWoodType.priceMultiplier).toFixed(2)
    : product.basePrice.toFixed(2);

  return (
    <div className="min-h-screen">
      <EcommerceNavbar />

      <div className="container mx-auto p-4">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>
            <a href="/">Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              href={`/categories/${product.category?.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {product.category?.name}
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ marginBottom: "16px" }}
        >
          Back to Products
        </Button>

        <Row gutter={[32, 24]}>
          {/* Product Image */}
          <Col xs={24} md={12} lg={10}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              fallback="data:image/png;base64,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"
            />
          </Col>

          {/* Product Details */}
          <Col xs={24} md={12} lg={14}>
            <Title level={2}>{product.name}</Title>

            <div className="mb-4">
              <Title level={4} style={{ color: "#1890ff", margin: 0 }}>
                Rs{calculatedPrice}
              </Title>
              {selectedWoodType && (
                <Text type="secondary">
                  Base price: Rs{product.basePrice.toFixed(2)} ×{" "}
                  {selectedWoodType.priceMultiplier} (
                  {selectedWoodType.woodType.name})
                </Text>
              )}
            </div>

            <Paragraph style={{ fontSize: "16px", marginBottom: "24px" }}>
              {product.description}
            </Paragraph>

            {/* Wood Type Selection */}
            {product.woodTypes && product.woodTypes.length > 0 && (
              <div className="mb-4">
                <Title level={5}>Wood Type:</Title>
                <Radio.Group
                  value={selectedWoodType?._id}
                  onChange={(e) => {
                    const selected = product.woodTypes.find(
                      (wt) => wt._id === e.target.value
                    );
                    setSelectedWoodType(selected);
                  }}
                >
                  {product.woodTypes.map((woodType) => (
                    <Radio.Button key={woodType._id} value={woodType._id}>
                      {woodType.woodType.name} (×{woodType.priceMultiplier})
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-4">
              <Title level={5}>Quantity:</Title>
              <InputNumber
                min={1}
                max={product.stock || 10}
                value={quantity}
                onChange={setQuantity}
                style={{ width: "120px" }}
              />
            </div>

            {/* Stock Info */}
            <div className="mb-4">
              {product.stock ? (
                <Tag color={product.stock > 10 ? "green" : "orange"}>
                  In Stock: {product.stock}
                </Tag>
              ) : (
                <Tag color="red">Out of Stock</Tag>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                disabled={!product.stock}
                style={{ minWidth: "180px" }}
              >
                Add to Cart
              </Button>

              <Button
                size="large"
                icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                onClick={toggleFavorite}
                danger={isFavorite}
              >
                {isFavorite ? "Saved" : "Save for Later"}
              </Button>
            </div>

            <Divider />

            {/* Product Specifications */}
            <Descriptions
              title="Product Specifications"
              bordered
              size="small"
              column={1}
            >
              <Descriptions.Item label="Category">
                {product.category?.name || "Uncategorized"}
              </Descriptions.Item>
              {product.dimensions && (
                <Descriptions.Item label="Dimensions">
                  {product.dimensions}
                </Descriptions.Item>
              )}
              {product.weight && (
                <Descriptions.Item label="Weight">
                  {product.weight}
                </Descriptions.Item>
              )}
              {/* Add more product specifications as needed */}
            </Descriptions>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetails;
