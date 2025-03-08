import React from "react";
import ProductGrid from "../shared/ProductGrid";
import EcommerceNavbar from "../EcommerceNavbar";

const OutdoorPatio = () => {
  const categoryFilter = (product) =>
    product.category?.name === "Outdoor & Patio" ||
    product.category?.name === "Outdoor & Patio ";

  return (
    <div className="site-container">
      <EcommerceNavbar />
      <ProductGrid
        title="Outdoor & Patio Furniture"
        categoryFilter={categoryFilter}
      />
    </div>
  );
};

export default OutdoorPatio;
