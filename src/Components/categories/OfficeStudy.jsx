import React from "react";
import ProductGrid from "../shared/ProductGrid";
import EcommerceNavbar from "../EcommerceNavbar";

const OfficeStudy = () => {
  const categoryFilter = (product) =>
    product.category?.name === "Office & Study" ||
    product.category?.name === "Office & Study ";

  return (
    <div className="site-container">
      <EcommerceNavbar />
      <ProductGrid
        title="Office & Study Furniture"
        categoryFilter={categoryFilter}
      />
    </div>
  );
};

export default OfficeStudy;
