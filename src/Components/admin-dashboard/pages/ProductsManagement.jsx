import { Tabs } from "antd";
import CategoriesTab from "./products/CategoriesTab";
import WoodsTab from "./products/WoodsTab";
import FurnitureTab from "./products/FurnitureTab";

const ProductsManagement = () => {
  const items = [
    {
      key: "1",
      label: "Categories",
      children: <CategoriesTab />,
    },
    {
      key: "2",
      label: "Woods",
      children: <WoodsTab />,
    },
    {
      key: "3",
      label: "Furniture",
      children: <FurnitureTab />,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Products Management</h1>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default ProductsManagement;
