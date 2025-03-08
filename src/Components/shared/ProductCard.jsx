import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { Card, Button, Typography, Tag, message, Tooltip, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  WalletOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Extract wood types from the product data
  const woodTypes = product.woodTypes || [];

  const handleAddToCart = (e) => {
    // Stop propagation to prevent navigation when clicking the button
    e.stopPropagation();

    addItem({
      id: product._id,
      name: product.name,
      price: product.basePrice,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    message.success(`${product.name} added to cart`);
  };

  const toggleFavorite = (e) => {
    // Stop propagation to prevent navigation when clicking the button
    e.stopPropagation();

    setIsFavorite(!isFavorite);
    message.success(
      isFavorite
        ? `${product.name} removed from favorites`
        : `${product.name} added to favorites`
    );

    // Here you would typically interact with an API or local storage
    // to persist favorites across sessions
  };

  // Navigate to product details page when card is clicked
  const handleCardClick = () => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // Create wood types tooltip content with enhanced styling
  const woodTypesContent = (
    <div
      style={{
        maxWidth: "250px",
        background: "#fff",
        borderRadius: "6px",
        padding: "12px",
        boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
      }}
    >
      <Text
        strong
        style={{
          display: "block",
          marginBottom: "10px",
          color: "#5c3f21",
          borderBottom: "1px solid #f0e0d0",
          paddingBottom: "8px",
        }}
      >
        Available Wood Types:
      </Text>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {woodTypes.map((woodTypeObj) => (
          <div
            key={woodTypeObj._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 8px",
              backgroundColor: "#faf6f2",
              borderRadius: "4px",
            }}
          >
            <Text strong style={{ color: "#7d5a38" }}>
              {woodTypeObj.woodType?.name || "Unknown"}
            </Text>
            <Text style={{ color: "#b08968" }}>
              ×{woodTypeObj.priceMultiplier}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card
      hoverable
      size="small"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
      cover={
        product.imageUrl && (
          <div
            style={{
              height: "180px",
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )
      }
      bodyStyle={{
        padding: "12px",
        height: "220px", // Reduced height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        strong
        style={{ fontSize: "16px", display: "block", marginBottom: "4px" }}
      >
        {product.name}
      </Text>

      <Text
        type="secondary"
        style={{
          display: "block",
          height: "40px",
          overflow: "hidden",
          fontSize: "12px",
          marginBottom: "8px",
        }}
      >
        {product.description?.length > 60
          ? `${product.description.substring(0, 60)}...`
          : product.description}
      </Text>

      {/* Wood Types Information - As Badge with Tooltip */}
      <div style={{ marginBottom: "8px", flexShrink: 0 }}>
        {woodTypes.length > 0 ? (
          <Tooltip
            title={woodTypesContent}
            placement="right"
            color="#fff"
            overlayInnerStyle={{ padding: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking tooltip
          >
            <Badge
              count={woodTypes.length}
              overflowCount={99}
              style={{
                backgroundColor: woodTypes.length > 0 ? "#8B5A2B" : "#BFBFBF",
              }}
            >
              <Tag
                color="brown"
                icon={<WalletOutlined />}
                style={{
                  cursor: "pointer",
                  padding: "0 8px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#a67c52",
                  borderColor: "#8d6e4e",
                }}
                className="wood-tag"
              >
                Wood Options
              </Tag>
            </Badge>
          </Tooltip>
        ) : (
          <Tag
            color="default"
            style={{
              margin: 0,
              backgroundColor: "#f5f5f5",
              borderColor: "#d9d9d9",
            }}
          >
            Standard Wood
          </Tag>
        )}
      </div>

      {/* Flex spacer to push price and buttons to bottom */}
      <div style={{ flex: "1 0 auto" }}></div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          flexShrink: 0,
        }}
      >
        <Text
          style={{ fontWeight: "bold", color: "#1890ff", fontSize: "16px" }}
        >
          ${product.basePrice?.toFixed(2)}
        </Text>
        {product.stock && (
          <Tag
            color={product.stock > 10 ? "green" : "orange"}
            style={{
              marginRight: 0,
              transition: "all 0.3s ease",
            }}
          >
            Stock: {product.stock}
          </Tag>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <Button
          type="primary"
          size="small"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart} // This now has stopPropagation
          style={{
            flex: 1,
            backgroundColor: "#1677ff",
            borderColor: "#1677ff",
            transition: "all 0.3s ease",
          }}
          className="cart-button"
        >
          Add to cart
        </Button>

        <Button
          type={isFavorite ? "danger" : "default"}
          size="small"
          icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
          onClick={toggleFavorite} // This now has stopPropagation
          style={{
            minWidth: "40px",
            transition: "all 0.3s ease",
            ...(isFavorite
              ? {
                  backgroundColor: "#ff4d4f",
                  borderColor: "#ff4d4f",
                  color: "#fff",
                }
              : {}),
          }}
          className="favorite-button"
        />
      </div>
    </Card>
  );
};

export default ProductCard;
