import React from "react";
import ProductGrid from "../shared/ProductGrid";
import EcommerceNavbar from "../EcommerceNavbar";

const BedroomFurniture = () => {
  const categoryFilter = (product) =>
    product.category?.name === "Bedroom Furniture";

  return (
    <div className="site-container">
      <EcommerceNavbar />
      <ProductGrid title="Bedroom Furniture" categoryFilter={categoryFilter} />
    </div>
  );
};

export default BedroomFurniture;
