import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Badge,
  Button,
  Space,
  Drawer,
  Modal,
  Form,
  message,
} from "antd";
import { MdOutlineLogout } from "react-icons/md";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  SearchOutlined,
  MenuOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // For managing cookies
import axios from "axios";
import { useCartData } from "./cart/Cart"; // Import our custom hook

const { Header } = Layout;
const { SubMenu } = Menu;

const EcommerceNavbar = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [updateForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  // Use our custom hook to get cart count
  const { cartCount, isLoading } = useCartData();

  // Check if the user is logged in
  const isLoggedIn = !!Cookies.get("accessToken"); // Or use localStorage.getItem("accessToken")

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId"); // Remove the access token from cookies
    // localStorage.removeItem("accessToken"); // If using localStorage
    navigate("/login"); // Redirect to the login page
  };

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("accessToken");

      if (!userId || !token) return;

      const response = await axios.get(
        `http://localhost:3000/api/auth/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);

      // Pre-populate the form with user data
      updateForm.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      message.error("Failed to load user information");
    }
  };

  // Profile modal handlers
  const showProfileModal = () => {
    setProfileModalVisible(true);
    fetchUserDetails(); // Fetch user details when modal opens
  };

  const closeProfileModal = () => {
    setProfileModalVisible(false);
    updateForm.resetFields();
  };

  // Handle updating user profile
  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);

      // Get user ID from wherever it's stored (you may need to adapt this)
      const userId = Cookies.get("userId"); // Assuming you store userId in cookies
      const token = Cookies.get("accessToken");

      // Only include password fields if newPassword is provided
      const payload = {
        userId: userId,
        name: values.name,
        email: values.email,
      };

      if (values.newPassword) {
        payload.currentPassword = values.currentPassword;
        payload.newPassword = values.newPassword;
      }

      const response = await axios.put(
        `http://localhost:3000/api/auth/users/${userId}/update-with-password`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Profile updated successfully");
      closeProfileModal();
      // Refresh user data after successful update
      fetchUserDetails();
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          <a href="/">WOOD CRAFTS</a>
        </div>

        {/* Desktop Menu */}
        <Menu
          mode="horizontal"
          className="hidden lg:flex border-none"
          theme="light"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <SubMenu key="categories" title="Categories">
            <Menu.Item key="living-room">
              <a href="/categories/living-room">Living Room</a>
            </Menu.Item>
            <Menu.Item key="dining-kitchen">
              <a href="/categories/dining-kitchen">Dining & Kitchen</a>
            </Menu.Item>
            <Menu.Item key="bedroom">
              <a href="/categories/bedroom-furniture">Bedroom Furniture</a>
            </Menu.Item>
            <Menu.Item key="office-study">
              <a href="/categories/office-study">Office & Study</a>
            </Menu.Item>
            <Menu.Item key="outdoor-patio">
              <a href="/categories/outdoor-patio">Outdoor & Patio</a>
            </Menu.Item>
          </SubMenu>
   
          <Menu.Item key="new-arrivals">
            <a href="/new-arrivals">New Arrivals</a>
          </Menu.Item>
          <Menu.Item key="contact-us">
            <a href="/contact">Contact Us</a>
          </Menu.Item>
          <Menu.Item key="orders" >
            <a href="/orders">My Orders</a>
          </Menu.Item>
        </Menu>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          className="lg:hidden text-xl text-gray-600"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        {/* Search Bar (hidden on small screens) */}
        <div className="hidden md:flex flex-1 mx-4">
          <Input
            placeholder="Search for products"
            size="large"
            suffix={<SearchOutlined />}
            className="rounded-md"
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Wishlist */}
          <Badge count={2} offset={[-4, 8]}>
            <a href="/wishlist" className="text-gray-600 hover:text-blue-600">
              <HeartOutlined className="text-2xl" />
            </a>
          </Badge>

          {/* Cart - Shows real count from API with loading state handling */}
          <Badge
            count={isLoading ? "..." : cartCount}
            offset={[-4, 8]}
            style={{ backgroundColor: isLoading ? "#8c8c8c" : "#1677ff" }}
          >
            <a href="/cart" className="text-gray-600 hover:text-blue-600">
              <ShoppingCartOutlined className="text-2xl" />
            </a>
          </Badge>

          {/* User Profile or Login/Signup */}
          {isLoggedIn ? (
            <Space>
              {/* User Profile - Changed to open modal instead of navigating */}
              <Button
                type="text"
                icon={<UserOutlined />}
                onClick={showProfileModal}
              >
                Profile
              </Button>
              {/* Logout Button */}
              <Button
                type="primary"
                danger
                icon={<MdOutlineLogout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Space>
          ) : (
            <Space>
              {/* Sign In */}
              <Button type="text" icon={<UserOutlined />}>
                <a href="/login">Sign In</a>
              </Button>
              {/* Sign Up */}
              <Button type="primary">
                <a href="/signup">Sign Up</a>
              </Button>
            </Space>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="vertical" theme="light">
          <SubMenu key="categories" title="Categories">
            <Menu.Item key="living-room">
              <a href="/categories/living-room">Living Room</a>
            </Menu.Item>
            <Menu.Item key="dining-kitchen">
              <a href="/categories/dining-kitchen">Dining & Kitchen</a>
            </Menu.Item>
            <Menu.Item key="bedroom">
              <a href="/categories/bedroom-furniture">Bedroom Furniture</a>
            </Menu.Item>
            <Menu.Item key="office-study">
              <a href="/categories/office-study">Office & Study</a>
            </Menu.Item>
            <Menu.Item key="outdoor-patio">
              <a href="/categories/outdoor-patio">Outdoor & Patio</a>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="deals">
            <a href="/deals">Deals</a>
          </Menu.Item>
          <Menu.Item key="new-arrivals">
            <a href="/new-arrivals">New Arrivals</a>
          </Menu.Item>
          <Menu.Item key="contact-us">
            <a href="/contact">Contact Us</a>
          </Menu.Item>
          <Menu.Item key="orders">
            <a href="/orders">My Orders</a>
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* User Profile Update Modal */}
      <Modal
        title="Update Profile"
        open={profileModalVisible}
        onCancel={closeProfileModal}
        footer={null}
      >
        <Form
          form={updateForm}
          layout="vertical"
          onFinish={handleUpdateProfile}
        >
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Please enter a valid email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Current Password" name="currentPassword">
            <Input.Password placeholder="Enter current password (required for password change)" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            dependencies={["currentPassword"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && !getFieldValue("currentPassword")) {
                    return Promise.reject("Please enter your current password");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="Enter new password (optional)" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("newPassword") && !value) {
                    return Promise.reject("Please confirm your password");
                  }
                  if (
                    getFieldValue("newPassword") &&
                    value !== getFieldValue("newPassword")
                  ) {
                    return Promise.reject("Passwords do not match");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={closeProfileModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Profile
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  );
};

export default EcommerceNavbar;
