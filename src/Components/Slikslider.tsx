import React, { useState, useEffect } from "react";
import {
  FaCartArrowDown,
  FaHeart,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCheck,
} from "react-icons/fa";
import Slider from "react-slick";
import { toast } from "react-hot-toast";
import { addToCart } from "./cart/Cart";
import { Modal, Button, Typography, message } from "antd";

const { Text } = Typography;

// Define interfaces for TypeScript
interface WoodType {
  _id: string;
  woodType: {
    _id: string;
    name: string;
  };
  priceMultiplier: number;
}

interface Product {
  _id: string;
  name: string;
  basePrice: number;
  description: string;
  imageUrl: string;
  woodTypes: WoodType[];
  stock: number;
}

interface SliksliderProps {
  category?: string;
}

// Custom Next Arrow
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="absolute right-2 top-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transform -translate-y-1/2 transition-all duration-300 opacity-75 hover:opacity-100 border border-gray-200"
    onClick={onClick}
  >
    <FaArrowAltCircleRight className="text-gray-800" />
  </button>
);

// Custom Previous Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="absolute left-2 top-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transform -translate-y-1/2 transition-all duration-300 opacity-75 hover:opacity-100 border border-gray-200"
    onClick={onClick}
  >
    <FaArrowAltCircleLeft className="text-gray-800" />
  </button>
);

const Slikslider: React.FC<SliksliderProps> = ({ category = "" }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  // States for wood type selection modal
  const [showWoodTypeModal, setShowWoodTypeModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWoodType, setSelectedWoodType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/furniture");
        const data = await response.json();

        // Filter products by category if a category is provided
        const filteredData = category
          ? data.filter(
              (product: Product) =>
                product.category?.name === category ||
                product.category?.name.includes(category) ||
                category.includes(product.category?.name)
            )
          : data;

        setProducts(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Re-fetch when category changes

  // Open modal to select wood type
  const handleAddToCartClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setSelectedWoodType("");
    setQuantity(1);
    setError(null);
    setShowWoodTypeModal(true);
  };

  // Close the modal and reset states
  const handleCancel = () => {
    setShowWoodTypeModal(false);
    setSelectedProduct(null);
    setSelectedWoodType("");
    setQuantity(1);
    setError(null);
  };

  // Add to cart with selected wood type
  const confirmAddToCart = async () => {
    if (!selectedProduct) return;

    if (!selectedWoodType && selectedProduct?.woodTypes?.length > 0) {
      setError("Please select a wood type");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call API to add to cart
      await addToCart(selectedProduct._id, quantity, selectedWoodType);

      // Show visual feedback
      setAddedToCart((prev) => ({ ...prev, [selectedProduct._id]: true }));
      setTimeout(() => {
        setAddedToCart((prev) => ({ ...prev, [selectedProduct._id]: false }));
      }, 1500);

      // Success message
      toast.success(`${selectedProduct.name} added to cart!`);

      // Close modal
      setShowWoodTypeModal(false);
      setSelectedProduct(null);
    } catch (error: any) {
      console.error("Error adding to cart:", error);

      // Check if error is authentication-related
      if (error.response && error.response.status === 401) {
        message.error("Please log in to add items to cart");
      } else {
        setError("Failed to add item to cart. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white px-16">
      {loading ? (
        <div className="text-center py-8">
          Loading {category || "products"}...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          No products found for this category
        </div>
      ) : (
        <Slider {...settings} className="overflow-hidden">
          {products.map((product) => (
            <div key={product._id} className="px-4">
              <div className="relative group">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-contain transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-white p-3 rounded-full shadow-md mx-2 hover:bg-gray-100 transition-all"
                    onClick={(e) => handleAddToCartClick(product, e)}
                  >
                    {addedToCart[product._id] ? (
                      <FaCheck className="text-green-600 text-xl" />
                    ) : (
                      <FaCartArrowDown className="text-gray-800 text-xl" />
                    )}
                  </button>
                  <button className="bg-white p-3 rounded-full shadow-md mx-2 hover:bg-gray-100 transition-all">
                    <FaHeart className="text-gray-800 text-xl" />
                  </button>
                </div>
              </div>
              <h3 className="text-center text-lg font-medium pt-4">
                {product.name}
              </h3>
              <p className="text-center font-medium">
                ${product.basePrice?.toLocaleString()}
              </p>
            </div>
          ))}
        </Slider>
      )}

      {/* Wood Type Selection Modal */}
      <Modal
        title={
          selectedProduct
            ? `Select Wood Type for ${selectedProduct.name}`
            : "Select Wood Type"
        }
        open={showWoodTypeModal}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={confirmAddToCart}
            disabled={
              !selectedWoodType && selectedProduct?.woodTypes?.length > 0
            }
          >
            Add to Cart
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div style={{ marginBottom: "20px" }}>
            <Text>Please select a wood type for this item:</Text>
            <div style={{ marginTop: "10px", marginBottom: "20px" }}>
              <select
                value={selectedWoodType}
                onChange={(e) => setSelectedWoodType(e.target.value)}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: error ? "1px solid #ff4d4f" : "1px solid #d9d9d9",
                }}
              >
                <option value="">-- Select Wood Type --</option>
                {selectedProduct.woodTypes?.map((wood) => (
                  <option key={wood._id} value={wood._id}>
                    {wood.woodType?.name || "Unknown"} (×{wood.priceMultiplier})
                  </option>
                ))}
              </select>
              {error && (
                <Text
                  type="danger"
                  style={{ display: "block", marginTop: "4px" }}
                >
                  {error}
                </Text>
              )}
            </div>

            <Text>Quantity:</Text>
            <div
              className="quantity-selector"
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                disabled={isLoading || quantity <= 1}
              >
                -
              </Button>
              <span
                style={{
                  margin: "0 10px",
                  minWidth: "30px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </span>
              <Button
                onClick={() => setQuantity((q) => q + 1)}
                disabled={isLoading}
              >
                +
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Slikslider;
