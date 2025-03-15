import React from "react";
import { Typography, Layout } from "antd";
import ProductGrid from "../Components/shared/ProductGrid";
import EcommerceNavbar from "../Components/EcommerceNavbar";
import Footer from "../Components/shared/Footer";

const { Content } = Layout;
const { Title } = Typography;

const NewArrivals = () => {
  // Filter for new arrivals - typically we'd look for recently added products
  // This function can be adjusted based on your API data structure
  const isNewArrival = (product) => {
    // If your products have a "createdAt" or similar date field, you can filter by that
    // Example: return new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    // For testing purposes, just show all products or a random subset
    return true; // Show all products as "new arrivals" for now
  };

  return (
    <Layout className="min-h-screen">
      <EcommerceNavbar />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 24 }}>
        <div className="site-layout-background" style={{ padding: 5, minHeight: 380 }}>
      
          
          {/* Use the shared ProductGrid component with a filter for new arrivals */}
          <ProductGrid 
            title="New Collection" 
            categoryFilter={isNewArrival}
          />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default NewArrivals;
