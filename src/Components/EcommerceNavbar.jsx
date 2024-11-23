import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, Badge, Button, Space, Drawer } from "antd";
import { ShoppingCartOutlined, UserOutlined, HeartOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const EcommerceNavbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollingDown(true); // Scrolling down
      } else {
        setScrollingDown(false); // Scrolling up
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <>
      {/* Top Navigation */}
      <Header
        className={`bg-white shadow-md sticky top-0 w-full z-50 transition-all duration-300 ${scrollingDown ? 'transform -translate-y-full' : ''}`}
      >
        <div className="container mx-auto flex justify-between items-center h-full">
          {/* Logo */}
          <div className="text-xl font-bold text-blue-600">
            <a href="/">WOOD CRAFTS</a>
          </div>

          {/* Desktop Menu */}
          <Menu mode="horizontal" className="hidden lg:flex border-none" theme="light" style={{ flex: 1, justifyContent: "center" }}>
            <Menu.Item key="categories">
              <a href="/categories">Categories</a>
            </Menu.Item>
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
          <Button type="text" className="lg:hidden text-xl text-gray-600" icon={<MenuOutlined />} onClick={showDrawer} />

          {/* Search Bar (hidden on small screens) */}
          <div className="hidden md:flex flex-1 mx-4">
            <Input placeholder="Search for products" size="large" suffix={<SearchOutlined />} className="rounded-md" />
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
        <Drawer title="Menu" placement="left" onClose={closeDrawer} visible={drawerVisible} bodyStyle={{ padding: 0 }}>
          <Menu mode="vertical" theme="light">
            <Menu.Item key="categories">
              <a href="/categories">Categories</a>
            </Menu.Item>
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

     
      <div
        className={`bg-white shadow-md fixed top-[64px]  w-full z-50 transition-all duration-300 ${scrollingDown ? 'transform translate-y-full top-[-49px] ' : 'translate-y-0'}`}
      >
        <div className="container mx-auto flex justify-between items-center h-full">
          <Menu mode="horizontal" theme="light" style={{ flex: 1, justifyContent: "center" }}>
            <Menu.Item key="categories">
              <a href="/categories">Categories</a>
            </Menu.Item>
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
        </div>
      </div>
    </>
  );
};

export default EcommerceNavbar;
