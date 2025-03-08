import React, { useState, useEffect } from "react";
import { Typography, Spin, Empty, Row, Col } from "antd";
import ProductCard from "./ProductCard";

const { Title } = Typography;

const ProductGrid = ({ title, categoryFilter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/furniture");
        const data = await response.json();

        // Apply filter if provided
        const filteredProducts = categoryFilter
          ? data.filter(categoryFilter)
          : data;

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter]);

  return (
    <div style={{ padding: "16px" }}>
      <Title level={3} style={{ marginBottom: "16px", fontSize: "20px" }}>
        {title}
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="default" tip="Loading..." />
        </div>
      ) : products.length === 0 ? (
        <Empty
          description={`No ${title.toLowerCase()} products found.`}
          imageStyle={{ height: "40px" }}
        />
      ) : (
        <Row gutter={[16, 24]}>
          {" "}
          {/* Increased vertical gutter to 24px */}
          {products.map((product) => (
            <Col
              xs={12}
              sm={8}
              md={6}
              lg={6}
              xl={4}
              key={product._id}
              style={{ display: "flex" }} /* Make columns flex containers */
            >
              <div style={{ width: "100%" }}>
                <ProductCard product={product} />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductGrid;
