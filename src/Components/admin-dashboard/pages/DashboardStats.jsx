import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Progress,
  Spin,
  Space,
  message,
} from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const { Title } = Typography;

const DashboardStats = () => {
  const [stats, setStats] = useState({
    users: { total: 0, loading: true },
    products: { total: 0, categoriesCount: 0, loading: true },
    orders: {
      total: 0,
      pending: 0,
      accepted: 0,
      rejected: 0,
      shipped: 0,
      delivered: 0,
      loading: true,
    },
    revenue: { total: 0, loading: true },
  });

  // Add new state for inventory data
  const [inventoryStats, setInventoryStats] = useState({
    loading: true,
    categories: [],
  });

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
  });

  const fetchStats = async () => {
    try {
      // Fetch all categories first
      const categoriesPromise = axios.get(
        "http://localhost:3000/api/categories",
        getAuthHeader()
      );

      // Fetch furniture data
      const furniturePromise = axios.get(
        "http://localhost:3000/api/furniture",
        getAuthHeader()
      );

      // Wait for both promises to resolve
      const [categoriesRes, furnitureRes] = await Promise.all([
        categoriesPromise,
        furniturePromise,
      ]);

      const allCategories = categoriesRes.data;
      const furnitureData = furnitureRes.data;

      // Initialize inventory stats with all categories
      const inventoryByCategory = allCategories.map((category) => ({
        id: category._id,
        name: category.name,
        totalItems: 0,
        inStock: 0,
        lowStock: 0,
      }));

      // Update inventory stats with furniture data
      furnitureData.forEach((item) => {
        if (item.category && item.category._id) {
          const categoryIndex = inventoryByCategory.findIndex(
            (cat) => cat.id === item.category._id
          );

          if (categoryIndex !== -1) {
            inventoryByCategory[categoryIndex].totalItems++;

            if (item.stock > 0) {
              inventoryByCategory[categoryIndex].inStock++;
              if (item.stock <= 5) {
                inventoryByCategory[categoryIndex].lowStock++;
              }
            }
          }
        }
      });

      // Continue with other API calls
      const usersPromise = axios
        .get("http://localhost:3000/api/auth/users", getAuthHeader())
        .then((res) => ({
          total: res.data.length,
        }));

      // Fetch orders stats
      const ordersPromise = axios
        .get("http://localhost:3000/api/orders", getAuthHeader())
        .then((res) => {
          const orders = res.data;
          const total = orders.length;
          const pending = orders.filter(
            (order) => order.status === "pending"
          ).length;
          const accepted = orders.filter(
            (order) => order.status === "accepted"
          ).length;
          const rejected = orders.filter(
            (order) => order.status === "rejected"
          ).length;
          const shipped = orders.filter(
            (order) => order.status === "shipped"
          ).length;
          const delivered = orders.filter(
            (order) => order.status === "delivered"
          ).length;

          // Calculate total revenue from accepted, shipped and delivered orders
          const totalRevenue = orders
            .filter((order) =>
              ["accepted", "shipped", "delivered"].includes(order.status)
            )
            .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

          return {
            total,
            pending,
            accepted,
            rejected,
            shipped,
            delivered,
            revenue: totalRevenue,
          };
        });

      // Wait for remaining promises to resolve
      const [users, orders] = await Promise.all([usersPromise, ordersPromise]);

      setStats({
        users: { ...users, loading: false },
        products: {
          total: furnitureData.length,
          categoriesCount: allCategories.length,
          loading: false,
        },
        orders: {
          total: orders.total,
          pending: orders.pending,
          accepted: orders.accepted,
          rejected: orders.rejected,
          shipped: orders.shipped,
          delivered: orders.delivered,
          loading: false,
        },
        revenue: { total: orders.revenue, loading: false },
      });

      // Set inventory data
      setInventoryStats({
        loading: false,
        categories: inventoryByCategory,
      });
    } catch (error) {
      message.error("Failed to load dashboard statistics");
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Dashboard Overview</Title>
        <p className="text-gray-500">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full">
            <Statistic
              title="Total Users"
              value={stats.users.total}
              prefix={<UserOutlined />}
              loading={stats.users.loading}
              suffix={
                <Link
                  to="/dashboard/users"
                  className="text-xs text-blue-500 ml-2"
                >
                  View all
                </Link>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full">
            <Statistic
              title="Products"
              value={stats.products.total}
              prefix={<ShoppingOutlined />}
              loading={stats.products.loading}
              suffix={
                <Link
                  to="/dashboard/products"
                  className="text-xs text-blue-500 ml-2"
                >
                  View all
                </Link>
              }
            />
            <div className="mt-2 text-xs text-gray-500">
              Across {stats.products.categoriesCount} categories
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full">
            <Statistic
              title="Total Orders"
              value={stats.orders.total}
              prefix={<ShoppingCartOutlined />}
              loading={stats.orders.loading}
              suffix={
                <Link
                  to="/dashboard/orders"
                  className="text-xs text-blue-500 ml-2"
                >
                  View all
                </Link>
              }
            />
            <div className="mt-2 text-xs">
              <span className="text-yellow-500 mr-2">
                {stats.orders.pending} pending
              </span>
              <span className="text-green-500 mr-2">
                {stats.orders.accepted} accepted
              </span>
              <span className="text-blue-500 mr-2">
                {stats.orders.shipped} shipped
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full">
            <Statistic
              title="Total Revenue"
              value={stats.revenue.total}
              precision={2}
              prefix={<span>Rs </span>}
              loading={stats.revenue.loading}
              suffix={
                <span className="text-green-500 text-xs flex items-center ml-2">
                  <ArrowUpOutlined /> 15%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Orders Status and Inventory Status */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={12}>
          <Card title="Order Status" bordered={false}>
            {stats.orders.loading ? (
              <div className="flex justify-center p-10">
                <Spin />
              </div>
            ) : (
              <>
                <Row className="mb-4">
                  <Col span={8}>
                    <div className="text-center">
                      <Progress
                        type="circle"
                        percent={
                          Math.round(
                            (stats.orders.pending / stats.orders.total) * 100
                          ) || 0
                        }
                        strokeColor="#faad14"
                      />
                      <div className="mt-2">Pending</div>
                      <div className="text-lg font-semibold">
                        {stats.orders.pending}
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <Progress
                        type="circle"
                        percent={
                          Math.round(
                            (stats.orders.accepted / stats.orders.total) * 100
                          ) || 0
                        }
                        strokeColor="#52c41a"
                      />
                      <div className="mt-2">Accepted</div>
                      <div className="text-lg font-semibold">
                        {stats.orders.accepted}
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <Progress
                        type="circle"
                        percent={
                          Math.round(
                            (stats.orders.shipped / stats.orders.total) * 100
                          ) || 0
                        }
                        strokeColor="#1890ff"
                      />
                      <div className="mt-2">Shipped</div>
                      <div className="text-lg font-semibold">
                        {stats.orders.shipped}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <div className="text-center">
                      <Progress
                        type="circle"
                        percent={
                          Math.round(
                            (stats.orders.delivered / stats.orders.total) * 100
                          ) || 0
                        }
                        strokeColor="#722ed1"
                      />
                      <div className="mt-2">Delivered</div>
                      <div className="text-lg font-semibold">
                        {stats.orders.delivered}
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <Progress
                        type="circle"
                        percent={
                          Math.round(
                            (stats.orders.rejected / stats.orders.total) * 100
                          ) || 0
                        }
                        strokeColor="#f5222d"
                      />
                      <div className="mt-2">Rejected</div>
                      <div className="text-lg font-semibold">
                        {stats.orders.rejected}
                      </div>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>

        {/* Inventory Status with all categories */}
        <Col xs={24} md={12}>
          <Card
            title="Inventory Status"
            bordered={false}
            extra={
              <Link to="/dashboard/products" className="text-blue-500">
                Manage
              </Link>
            }
          >
            {inventoryStats.loading ? (
              <div className="flex justify-center p-10">
                <Spin />
              </div>
            ) : (
              <div
                className="space-y-4"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {inventoryStats.categories.map((category) => {
                  const inStockPercent =
                    Math.round(
                      (category.inStock / category.totalItems) * 100
                    ) || 0;
                  const statusColor =
                    inStockPercent < 30 ? "exception" : "active";

                  return (
                    <div key={category.id}>
                      <div className="flex justify-between mb-1">
                        <span>{category.name}</span>
                        <Space>
                          {category.totalItems > 0 ? (
                            <>
                              <span>{inStockPercent}%</span>
                              {category.lowStock > 0 && (
                                <span className="text-orange-500 text-xs">
                                  ({category.lowStock} low stock)
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No items
                            </span>
                          )}
                        </Space>
                      </div>

                      {category.totalItems > 0 ? (
                        <>
                          <Progress
                            percent={inStockPercent}
                            status={statusColor}
                            showInfo={false}
                          />
                          <div className="text-xs text-gray-500">
                            {category.inStock} of {category.totalItems} items in
                            stock
                          </div>
                        </>
                      ) : (
                        <>
                          <Progress
                            percent={0}
                            status="exception"
                            showInfo={false}
                          />
                          <div className="text-xs text-gray-500">
                            No furniture items in this category
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

                {inventoryStats.categories.length === 0 && (
                  <div className="text-center py-4">
                    No category data available
                  </div>
                )}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStats;
