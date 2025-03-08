import React from "react";
import ProductGrid from "../shared/ProductGrid";
import EcommerceNavbar from "../EcommerceNavbar";

const Electronics = () => {
  // No filter needed, we want all electronics
  return (
    <div className="site-container">
      <EcommerceNavbar />
      <ProductGrid title="Electronics" categoryFilter={null} />
    </div>
  );
};

export default Electronics;
