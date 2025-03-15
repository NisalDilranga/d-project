import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Input,
  Button,
} from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ background: "#001529", padding: "40px 50px 20px" }}>
      <div className="container mx-auto">
        <Row gutter={[32, 32]}>
          {/* Company Information */}
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Title level={3} style={{ color: "#fff", marginBottom: "20px" }}>
              WOOD CRAFTS
            </Title>
            <Text
              style={{ color: "#ccc", display: "block", marginBottom: "20px" }}
            >
              Handcrafted wooden furniture made with passion and expertise. We
              bring elegant, sustainable, and timeless pieces to your home.
            </Text>
            <Space size="large">
              <FacebookOutlined style={{ color: "#fff", fontSize: "24px" }} />
              <TwitterOutlined style={{ color: "#fff", fontSize: "24px" }} />
              <InstagramOutlined style={{ color: "#fff", fontSize: "24px" }} />
              <LinkedinOutlined style={{ color: "#fff", fontSize: "24px" }} />
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Title level={4} style={{ color: "#fff", marginBottom: "20px" }}>
              Quick Links
            </Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <Link href="/home" style={{ color: "#ccc" }}>
                Home
              </Link>
              <Link href="/categories/living-room" style={{ color: "#ccc" }}>
                Living Room
              </Link>
              <Link href="/categories/dining-kitchen" style={{ color: "#ccc" }}>
                Dining & Kitchen
              </Link>
              <Link
                href="/categories/bedroom-furniture"
                style={{ color: "#ccc" }}
              >
                Bedroom
              </Link>
              <Link href="/categories/office-study" style={{ color: "#ccc" }}>
                Office & Study
              </Link>
              <Link href="/categories/outdoor-patio" style={{ color: "#ccc" }}>
                Outdoor & Patio
              </Link>
              <Link href="/new-arrivals" style={{ color: "#ccc" }}>
                New Arrivals
              </Link>
              <Link href="/contact" style={{ color: "#ccc" }}>
                Contact Us
              </Link>
            </div>
          </Col>

          {/* Newsletter */}
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Title level={4} style={{ color: "#fff", marginBottom: "20px" }}>
              Newsletter
            </Title>
            <Text
              style={{ color: "#ccc", display: "block", marginBottom: "15px" }}
            >
              Subscribe to our newsletter to get updates on our latest offers
              and new products.
            </Text>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 100px)" }}
                placeholder="Your Email Address"
                prefix={<MailOutlined />}
              />
              <Button type="primary" style={{ width: "100px" }}>
                Subscribe
              </Button>
            </Input.Group>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#333", margin: "30px 0 20px" }} />

        <Row>
          <Col span={24}>
            <Text
              style={{ color: "#ccc", display: "block", textAlign: "center" }}
            >
              © {new Date().getFullYear()} Wood Crafts. All rights reserved.
            </Text>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;
