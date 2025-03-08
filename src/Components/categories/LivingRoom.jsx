import React from "react";
import ProductGrid from "../shared/ProductGrid";
import EcommerceNavbar from "../EcommerceNavbar";

const LivingRoom = () => {
  const categoryFilter = (product) => product.category?.name === "Living Room";

  return (
    <div className="site-container">
      <EcommerceNavbar />
      <ProductGrid
        title="Living Room Furniture"
        categoryFilter={categoryFilter}
      />
    </div>
  );
};

export default LivingRoom;
