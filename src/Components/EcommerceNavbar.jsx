import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Badge, Button, Space, Drawer } from "antd";
import { MdOutlineLogout } from "react-icons/md";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // For managing cookies
import axios from "axios";
import { useCartData } from "./cart/Cart"; // Import our custom hook

const { Header } = Layout;
const { SubMenu } = Menu;

const EcommerceNavbar = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const navigate = useNavigate();

  // Use our custom hook to get cart count
  const { cartCount, isLoading } = useCartData();

  // Check if the user is logged in
  const isLoggedIn = !!Cookies.get("accessToken"); // Or use localStorage.getItem("accessToken")

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("accessToken"); // Remove the access token from cookies
    // localStorage.removeItem("accessToken"); // If using localStorage
    navigate("/login"); // Redirect to the login page
  };

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

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
          <Menu.Item key="deals">
            <a href="/deals">Deals</a>
          </Menu.Item>
          <Menu.Item key="new-arrivals">
            <a href="/new-arrivals">New Arrivals</a>
          </Menu.Item>
          <Menu.Item key="contact-us">
            <a href="/contact-us">Contact Us</a>
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
              {/* User Profile */}
              <Button type="text" icon={<UserOutlined />}>
                <a href="/profile">Profile</a>
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
            <a href="/contact-us">Contact Us</a>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Header>
  );
};

export default EcommerceNavbar;
