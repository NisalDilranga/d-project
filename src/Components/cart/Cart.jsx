import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Button,
  List,
  Avatar,
  Spin,
  Typography,
  InputNumber,
  message,
  Divider,
  Empty,
  Card,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  RightOutlined,
} from "@ant-design/icons";
import EcommerceNavbar, { NavbarEvents } from "../EcommerceNavbar";
import { loadStripe } from "@stripe/stripe-js";

const { Title, Text } = Typography;

// Helper function to get authentication headers
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
});

// Create a custom hook to fetch and manage cart data
export const useCartData = () => {
  const [cartData, setCartData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/cart/",
        getAuthHeader()
      );

      // Store the complete response
      setCartData(response.data);

      // Extract items from the response
      const items = response.data.items || [];
      setCartItems(items);

      // Set cart count
      setCartCount(items.length);

      setError(null);
    } catch (err) {
      console.error("Error fetching cart data:", err);
      setError("Failed to load cart data");
      setCartData(null);
      setCartItems([]);
      setCartCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();

    // Subscribe to refresh events
    const unsubscribe = NavbarEvents?.subscribe
      ? NavbarEvents.subscribe(fetchCart)
      : null;

    return () => {
      // Cleanup subscription when component unmounts
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return {
    cartData,
    cartItems,
    cartCount,
    isLoading,
    error,
    refreshCart: fetchCart,
  };
};

// Function to add a product to cart that can be imported by other components
export const addToCart = async (furnitureId, quantity, woodTypeId) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/cart/add",
      {
        furnitureId,
        quantity: quantity || 1,
        woodTypeId,
      },
      getAuthHeader()
    );

    // Emit event to refresh navbar counts
    if (NavbarEvents?.emit) NavbarEvents.emit();

    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

const Cart = () => {
  const { cartData, cartItems, isLoading, error, refreshCart } = useCartData();
  const [updating, setUpdating] = useState(false);

  console.log(cartItems);
  console.log(cartData);

  // Move makePayment function inside the component so it can access cartItems
  const makePayment = async () => {
    try {
      // Show loading message
      message.loading("Preparing checkout...", 0);

      // Format cart items for order creation
      const orderItems = cartItems.map((item) => ({
        furniture: item.furniture?._id || item.furniture,
        woodType: item.woodType?._id || item.woodType,
        quantity: item.quantity,
        price: item.furniture.basePrice,
      }));

      // Create order payload
      const orderPayload = {
        items: orderItems,
        imageUrl: cartItems[0]?.furniture?.imageUrl || "",
        description: "Order from cart checkout",
      };

      // Send order to backend
      const orderResponse = await axios.post(
        "http://localhost:3000/api/orders",
        orderPayload,
        getAuthHeader()
      );

      console.log("Order created:", orderResponse.data);

      // Update furniture stock quantities after successful order
      for (const item of cartItems) {
        const furnitureId = item.furniture?._id || item.furniture;
        const quantity = item.quantity;

        try {
          await axios.put(
            `http://localhost:3000/api/furniture/${furnitureId}/reduce-stock`,
            {
              id: furnitureId, // Explicitly include the ID in the request body
              quantity,
            },
            getAuthHeader()
          );
          console.log(`Stock updated for furniture ${furnitureId}`);
        } catch (stockError) {
          console.error(
            `Failed to update stock for furniture ${furnitureId}:`,
            stockError
          );
          // Continue with checkout even if stock update fails
        }
      }

      // Clear the cart after successful order creation - Fix the parameter ordering
      await axios.delete(
        "http://localhost:3000/api/cart/clear",
        getAuthHeader() // Configuration object should be the second parameter for axios.delete
      );

      console.log("Cart cleared successfully");

      const stripe = await loadStripe(
        "pk_test_51PGYes09azGpyfrWuQuV4NzNm3fRGp7IxuO3lPeBis6uztinsHhEkBWh8LA6L0oip2r9SF0VDVpdDkEAAIXll9S000KWevjqfD"
      );

      const body = {
        products: cartItems,
        success_url: `${window.location.origin}/orders`,
        cancel_url: `${window.location.origin}/cart`,
      };

      // Send request to backend to create checkout session
      const response = await axios.post(
        "http://localhost:3000/api/checkout/create-session",
        body,
        getAuthHeader()
      );

      message.destroy(); // Hide loading message

      // Check if response contains sessionId
      const sessionId = response.data.id;
      if (!sessionId) {
        throw new Error("Failed to create checkout session");
      }

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      message.destroy();
      console.error("Checkout error:", error);
      message.error("Something went wrong with checkout. Please try again.");
    }
  };

  // Function to update cart item quantity via API - Updated with correct endpoint
  const updateCartItem = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating(true);
    try {
      await axios.put(
        `http://localhost:3000/api/cart/item/update/${itemId}`,
        { quantity: newQuantity },
        getAuthHeader()
      );
      message.success("Cart updated successfully");
      refreshCart(); // Refresh cart data after update
      NavbarEvents.emit(); // Emit event after updating cart item
    } catch (error) {
      console.error("Error updating cart item:", error);
      message.error("Failed to update cart. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // Function to remove item via API - Updated with correct endpoint
  const removeCartItem = async (itemId) => {
    setUpdating(true);
    try {
      await axios.delete(
        `http://localhost:3000/api/cart/item/${itemId}`,
        getAuthHeader()
      );
      message.success("Item removed from cart");
      refreshCart(); // Refresh cart data after removal
      NavbarEvents.emit(); // Emit event after removing cart item
    } catch (error) {
      console.error("Error removing cart item:", error);
      message.error("Failed to remove item. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const renderContent = () => {
    if (isLoading || updating) {
      return (
        <div
          className="cart-loading"
          style={{ textAlign: "center", padding: "100px 0" }}
        >
          <Spin tip="Loading cart..." size="large" />
          <p style={{ marginTop: 20, color: "#666" }}>
            Please wait while we load your cart...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <Card
          className="error-card"
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "100px auto",
          }}
        >
          <div className="error-message" style={{ padding: "20px" }}>
            <Title level={4} style={{ color: "#ff4d4f" }}>
              Unable to load cart
            </Title>
            <Text>{error}</Text>
            <Button
              type="primary"
              onClick={refreshCart}
              style={{ marginTop: "20px" }}
            >
              Try Again
            </Button>
          </div>
        </Card>
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return (
        <div
          className="empty-cart"
          style={{ textAlign: "center", padding: "50px 0" }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span style={{ fontSize: "18px", color: "#666" }}>
                Your cart is empty
              </span>
            }
          >
            <Button type="primary" size="large" href="/">
              Continue Shopping
            </Button>
          </Empty>
        </div>
      );
    }

    // Get the total amount from the API response
    const cartTotal = cartData?.totalAmount || 0;

    return (
      <div
        className="cart-content"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Title level={2}>
          <ShoppingCartOutlined style={{ marginRight: "10px" }} />
          Shopping Cart ({cartItems.length} items)
        </Title>

        <Divider />

        <div
          className="cart-layout"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div className="cart-items" style={{ flex: "3", minWidth: "300px" }}>
            <Card className="items-card" bodyStyle={{ padding: "0" }}>
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item
                    key={item._id}
                    actions={[
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeCartItem(item._id)}
                        disabled={updating}
                        style={{
                          fontSize: "16px",
                          height: "32px",
                          width: "32px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />,
                    ]}
                    style={{
                      padding: "15px 20px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={item.furniture?.imageUrl}
                          shape="square"
                          size={80}
                          alt={item.furniture?.name}
                          style={{
                            border: "1px solid #eee",
                            borderRadius: "4px",
                          }}
                        />
                      }
                      title={
                        <Text strong style={{ fontSize: "16px" }}>
                          {item.furniture?.name || "Product"}
                        </Text>
                      }
                      description={
                        <div style={{ marginTop: "8px" }}>
                          {item.woodType ? (
                            <Text type="secondary">
                              Wood type: {item.woodType.name || "Unknown"}
                            </Text>
                          ) : (
                            <Text type="secondary">Standard wood</Text>
                          )}
                          <br />
                          <Text type="secondary">
                            Unit price: Rs
                            {(item.price / item.quantity).toFixed(2)}
                          </Text>
                        </div>
                      }
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <InputNumber
                        min={1}
                        max={item.furniture?.stock || 100}
                        value={item.quantity}
                        onChange={(value) => updateCartItem(item._id, value)}
                        disabled={updating}
                        style={{ width: "70px" }}
                      />
                      <Text
                        strong
                        style={{
                          fontSize: "16px",
                          minWidth: "80px",
                          textAlign: "right",
                        }}
                      >
                        Rs{item.price.toFixed(2)}
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>

          <div
            className="cart-summary"
            style={{ flex: "1", minWidth: "250px" }}
          >
            <Card
              title="Order Summary"
              style={{ position: "sticky", top: "80px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Text>Subtotal:</Text>
                <Text strong>Rs{cartTotal.toFixed(2)}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Text>Shipping:</Text>
                <Text>Free</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Text>Tax:</Text>
                <Text>Calculated at checkout</Text>
              </div>

              <Divider style={{ margin: "15px 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Total:
                </Title>
                <Title level={4} style={{ margin: 0 }}>
                  Rs{cartTotal.toFixed(2)}
                </Title>
              </div>

              <Button
                type="primary"
                size="large"
                block
                style={{ height: "46px", fontSize: "16px" }}
                onClick={makePayment}
              >
                Proceed to Checkout <RightOutlined />
              </Button>

              <Button type="link" block href="/" style={{ marginTop: "10px" }}>
                Continue Shopping
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="site-container">
      <EcommerceNavbar />
      <div
        className="cart-container"
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "20px auto",
          backgroundColor: "#f9f9f9",
          minHeight: "calc(100vh - 200px)",
          borderRadius: "8px",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Cart;
