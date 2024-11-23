import React from "react";
import { Layout, Menu, Input, Badge, Button, Space, Drawer } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;

const EcommerceNavbar = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);

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
            <Menu.Item key="electronics">
              <a href="/categories/electronics">Electronics</a>
            </Menu.Item>
            <Menu.Item key="fashion">
              <a href="/categories/fashion">Fashion</a>
            </Menu.Item>
            <Menu.Item key="home-appliances">
              <a href="/categories/home-appliances">Home Appliances</a>
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

          {/* Cart */}
          <Badge count={5} offset={[-4, 8]}>
            <a href="/cart" className="text-gray-600 hover:text-blue-600">
              <ShoppingCartOutlined className="text-2xl" />
            </a>
          </Badge>

          {/* User */}
          <Space>
            <Button type="text" icon={<UserOutlined />}>
              <a href="/login">Sign In</a>
            </Button>
            <Button type="primary">
              <a href="/signup">Sign Up</a>
            </Button>
          </Space>
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
            <Menu.Item key="electronics">
              <a href="/categories/electronics">Electronics</a>
            </Menu.Item>
            <Menu.Item key="fashion">
              <a href="/categories/fashion">Fashion</a>
            </Menu.Item>
            <Menu.Item key="home-appliances">
              <a href="/categories/home-appliances">Home Appliances</a>
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