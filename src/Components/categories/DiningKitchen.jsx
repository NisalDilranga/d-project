import React from "react";
import ProductGrid from "../shared/ProductGrid";
import EcommerceNavbar from "../EcommerceNavbar";

const DiningKitchen = () => {
  const categoryFilter = (product) =>
    product.category?.name === "Kitchen" ||
    product.category?.name === "Dining & Kitchen";

  return (
    <div className="site-container">
      <EcommerceNavbar />
      <ProductGrid
        title="Dining & Kitchen Furniture"
        categoryFilter={categoryFilter}
      />
    </div>
  );
};

export default DiningKitchen;
