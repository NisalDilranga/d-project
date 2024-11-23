import React from "react";
import { Layout, Row, Col, Input, Button, Space, Typography } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const EcommerceFooter = () => {
  return (
    <Footer className="bg-gray-900 text-white p-10">
      <Row gutter={[32, 32]} justify="space-between">
        {/* About Us Section */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} className="text-white">
            About Us
          </Title>
          <Text className="text-gray-400">
            Welcome to ShopEase, your one-stop shop for all your fashion,
            electronics, and lifestyle needs. Experience hassle-free shopping
            with us.
          </Text>
        </Col>

        {/* Customer Service Section */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} className="text-white">
            Customer Service
          </Title>
          <Space direction="vertical" size="small">
            <a href="#" className="text-gray-400 hover:text-white">
              FAQ
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Returns & Refunds
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Shipping Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Support
            </a>
          </Space>
        </Col>

        {/* Contact Section */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} className="text-white">
            Contact Us
          </Title>
          <Space direction="vertical" size="small">
            <Text className="text-gray-400">
              <MailOutlined /> support@shopease.com
            </Text>
            <Text className="text-gray-400">
              <PhoneOutlined /> +1 123-456-7890
            </Text>
            <Text className="text-gray-400">
              <EnvironmentOutlined /> 123 Main Street, City, Country
            </Text>
          </Space>
        </Col>

        {/* Newsletter Section */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} className="text-white">
            Stay Updated
          </Title>
          <Text className="text-gray-400">
            Subscribe to our newsletter for exclusive deals and updates.
          </Text>
          <div className="mt-4">
            <Input.Group compact>
              <Input
                placeholder="Enter your email"
                className="w-[70%] h-[40px]"
              />
              <Button type="primary" className="h-[40px]">
                Subscribe
              </Button>
            </Input.Group>
          </div>
        </Col>
      </Row>

      <div className="border-t border-gray-700 my-8"></div>

      <Row justify="space-between" align="middle">
        {/* Social Media Icons */}
        <Col>
          <Space size="large">
            <a href="#" className="text-gray-400 hover:text-white">
              <FacebookOutlined style={{ fontSize: "20px" }} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <TwitterOutlined style={{ fontSize: "20px" }} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <InstagramOutlined style={{ fontSize: "20px" }} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <LinkedinOutlined style={{ fontSize: "20px" }} />
            </a>
          </Space>
        </Col>

        {/* Copyright Info */}
        <Col>
          <Text className="text-gray-500">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default EcommerceFooter;
