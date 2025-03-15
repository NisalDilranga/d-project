import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Empty,
  Spin,
  message,
  Card,
  Button,
  Breadcrumb,
  Layout,
  Divider,
  Modal,
} from "antd";
import {
  HeartFilled,
  DeleteOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { addToCart } from "../Components/cart/Cart";
import EcommerceNavbar, { NavbarEvents } from "../Components/EcommerceNavbar";

const { Title, Text, Paragraph } = Typography;
const { Footer, Content } = Layout;

const WishlistPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingItems, setRemovingItems] = useState({});
  const navigate = useNavigate();

  // Add new state variables for wood type selection modal
  const [showWoodTypeModal, setShowWoodTypeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedWoodType, setSelectedWoodType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [addToCartError, setAddToCartError] = useState(null);

  // Check if user is logged in
  const isLoggedIn = !!Cookies.get("accessToken");

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) {
      message.info("Please login to view your wishlist");
      navigate("/login");
      return;
    }

    fetchFavorites();
  }, [isLoggedIn, navigate]);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(
        "http://localhost:3000/api/furniture/favorites",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavorites(response.data || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError("Failed to load your wishlist. Please try again.");
      message.error("Failed to load your wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (productId) => {
    setRemovingItems((prev) => ({ ...prev, [productId]: true }));
    try {
      const token = Cookies.get("accessToken");
      await axios.delete(
        `http://localhost:3000/api/furniture/${productId}/favorite`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state to remove the item
      setFavorites((prev) => prev.filter((item) => item._id !== productId));
      message.success("Item removed from favorites");

      // Explicitly trigger a refresh of the navbar counts
      console.log("Emitting NavbarEvents for favorite removal");
      NavbarEvents.emit();

      // Also refresh the favorites count in the navbar directly if possible
      // This is a fallback in case the event system fails
      setTimeout(() => NavbarEvents.emit(), 300);
    } catch (err) {
      console.error("Error removing from favorites:", err);
      message.error("Failed to remove item from favorites");
    } finally {
      setRemovingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation(); // Prevent navigation

    // Check if product has wood types
    if (product.woodTypes && product.woodTypes.length > 0) {
      // Show the wood type selection modal instead of navigating
      setSelectedProduct(product);
      setSelectedWoodType("");
      setQuantity(1);
      setAddToCartError(null);
      setShowWoodTypeModal(true);
    } else {
      // If no wood types, add directly to cart with default options
      try {
        setAddToCartLoading(true);
        await addToCart(product._id, 1);
        message.success(`${product.name} added to cart`);

        // Trigger navbar counts refresh
        NavbarEvents.emit();
      } catch (err) {
        message.error("Failed to add item to cart");
        console.error(err);
      } finally {
        setAddToCartLoading(false);
      }
    }
  };

  // Function to handle wood type selection and add to cart
  const confirmAddToCart = async () => {
    if (!selectedWoodType) {
      setAddToCartError("Please select a wood type");
      return;
    }

    setAddToCartLoading(true);
    setAddToCartError(null);

    try {
      // Call API to add to cart
      await addToCart(selectedProduct._id, quantity, selectedWoodType);

      // Success message
      message.success(`${selectedProduct.name} added to cart`);

      // Trigger navbar counts refresh
      NavbarEvents.emit();

      // Reset states and close modal
      setShowWoodTypeModal(false);
      setSelectedProduct(null);
      setSelectedWoodType("");
      setQuantity(1);
    } catch (err) {
      setAddToCartError("Failed to add item to cart. Please try again.");
      console.error(err);
    } finally {
      setAddToCartLoading(false);
    }
  };

  // Function to close the modal
  const handleModalCancel = () => {
    setShowWoodTypeModal(false);
    setSelectedProduct(null);
    setSelectedWoodType("");
    setQuantity(1);
    setAddToCartError(null);
  };

  return (
    <Layout className="min-h-screen">
      <EcommerceNavbar />

      <Content style={{ background: "#f5f7fa" }}>
        <div
          className="wishlist-header py-8 px-4 mb-6"
          style={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            borderBottom: "1px solid #eaedf2",
          }}
        >
          <div className="container mx-auto">
            <Breadcrumb
              className="mb-4"
              items={[
                {
                  title: (
                    <a href="/home">
                      <HomeOutlined />
                    </a>
                  ),
                },
                { title: "Wishlist" },
              ]}
            />

            <div className="flex justify-between items-center">
              <Title level={2} className="mb-0" style={{ color: "#2a3548" }}>
                <HeartFilled style={{ color: "#ff4d4f", marginRight: 12 }} />
                My Wishlist
              </Title>
              <div
                className="wishlist-count p-2 px-4 rounded-full"
                style={{
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Text type="secondary" strong>
                  {favorites.length} {favorites.length === 1 ? "item" : "items"}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <Spin size="large" />
              <Text className="mt-4 text-gray-500">
                Loading your wishlist...
              </Text>
            </div>
          ) : error ? (
            <div className="text-center my-8 p-8 bg-white rounded-lg shadow-sm">
              <Text type="danger" style={{ fontSize: "16px" }}>
                {error}
              </Text>
              <div className="mt-4">
                <Button type="primary" onClick={fetchFavorites}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="bg-white p-10 rounded-lg shadow-sm text-center">
              <Empty
                description={
                  <div>
                    <Title level={4}>Your wishlist is empty</Title>
                    <Paragraph type="secondary">
                      Add items you love to your wishlist. Review them anytime
                      and easily move them to the cart.
                    </Paragraph>
                  </div>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className="my-8"
              >
                <Button
                  type="primary"
                  onClick={() => navigate("/home")}
                  size="large"
                  className="mt-4"
                >
                  Browse Products
                </Button>
              </Empty>
            </div>
          ) : (
            <Row gutter={[20, 20]}>
              {favorites.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                  <Card
                    hoverable
                    className="product-card"
                    style={{
                      overflow: "hidden",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                    cover={
                      <div
                        className="product-image-container"
                        style={{ position: "relative" }}
                      >
                        <div
                          style={{
                            height: "220px",
                            backgroundImage: `url(${product.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transition: "transform 0.5s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        />
                        <div
                          className="image-overlay"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "rgba(0,0,0,0.3)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                        >
                          <Button
                            icon={<EyeOutlined />}
                            type="primary"
                            ghost
                            onClick={() => handleProductClick(product)}
                            style={{ backdropFilter: "blur(4px)" }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    }
                    bodyStyle={{ padding: "16px" }}
                    onClick={() => handleProductClick(product)}
                  >
                    <div style={{ minHeight: "150px" }}>
                      <Text
                        strong
                        style={{
                          fontSize: "16px",
                          display: "block",
                          marginBottom: "8px",
                          color: "#2a3548",
                        }}
                      >
                        {product.name}
                      </Text>

                      <Text
                        style={{
                          fontSize: "18px",
                          color: "#1890ff",
                          fontWeight: "bold",
                          display: "block",
                          marginBottom: "12px",
                        }}
                      >
                        ${product.basePrice?.toFixed(2)}
                      </Text>

                      <Paragraph
                        type="secondary"
                        ellipsis={{ rows: 2 }}
                        style={{
                          fontSize: "14px",
                          marginBottom: "12px",
                          height: "40px",
                        }}
                      >
                        {product.description}
                      </Paragraph>

                      {product.woodTypes && product.woodTypes.length > 0 && (
                        <div
                          className="wood-options-tag"
                          style={{
                            marginBottom: "12px",
                            background: "#f6f0e8",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            color: "#8B5A2B",
                            display: "inline-block",
                          }}
                        >
                          {product.woodTypes.length} wood{" "}
                          {product.woodTypes.length === 1
                            ? "option"
                            : "options"}{" "}
                          available
                        </div>
                      )}
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    <div
                      className="card-actions"
                      style={{ display: "flex", gap: "8px" }}
                    >
                      <Button
                        block
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={(e) => handleAddToCart(product, e)}
                        style={{ flex: 1 }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        loading={removingItems[product._id]}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromFavorites(product._id);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>

      {/* Wood Type Selection Modal */}
      <Modal
        title={
          selectedProduct
            ? `Select Wood Type for ${selectedProduct.name}`
            : "Select Wood Type"
        }
        open={showWoodTypeModal}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={addToCartLoading}
            onClick={confirmAddToCart}
            disabled={!selectedWoodType}
          >
            Add to Cart
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div style={{ marginBottom: "20px" }}>
            <Text>Please select a wood type for this item:</Text>
            <div style={{ marginTop: "10px", marginBottom: "20px" }}>
              <select
                value={selectedWoodType}
                onChange={(e) => setSelectedWoodType(e.target.value)}
                disabled={addToCartLoading}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: addToCartError
                    ? "1px solid #ff4d4f"
                    : "1px solid #d9d9d9",
                }}
              >
                <option value="">-- Select Wood Type --</option>
                {selectedProduct.woodTypes.map((wood) => (
                  <option key={wood._id} value={wood._id}>
                    {wood.woodType?.name || "Unknown"} (×{wood.priceMultiplier})
                  </option>
                ))}
              </select>
              {addToCartError && (
                <Text
                  type="danger"
                  style={{ display: "block", marginTop: "4px" }}
                >
                  {addToCartError}
                </Text>
              )}
            </div>

            <Text>Quantity:</Text>
            <div
              className="quantity-selector"
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                disabled={addToCartLoading || quantity <= 1}
              >
                -
              </Button>
              <span
                style={{
                  margin: "0 10px",
                  minWidth: "30px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </span>
              <Button
                onClick={() => setQuantity((q) => q + 1)}
                disabled={addToCartLoading}
              >
                +
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Footer
        style={{
          textAlign: "center",
          background: "#f0f2f5",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        Wood Crafts ©{new Date().getFullYear()} - All Rights Reserved
      </Footer>

      <style jsx>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
        }

        .product-card:hover .product-image-container > div {
          transform: scale(1.05);
        }

        .product-card:hover .image-overlay {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .wishlist-header {
            padding-top: 16px;
            padding-bottom: 16px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default WishlistPage;
