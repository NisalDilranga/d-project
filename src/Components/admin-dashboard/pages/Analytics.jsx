import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Select,
  DatePicker,
  Spin,
  Empty,
  Statistic,
  Divider,
  Button,
  message,
  Tabs,
} from "antd";
import { Line, Column, Pie, Area } from "@ant-design/plots";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Fetch orders for sales data
      const ordersRes = await axios.get(
        "http://localhost:3000/api/orders",
        getAuthHeader()
      );

      // Generate sales data based on orders
      const salesByDate = generateSalesData(ordersRes.data);
      setSalesData(salesByDate);

      // Fetch categories and products for category distribution
      const [categoriesRes, productsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:3000/api/categories", getAuthHeader()),
        axios.get("http://localhost:3000/api/furniture", getAuthHeader()),
        axios.get("http://localhost:3000/api/auth/users", getAuthHeader()),
      ]);

      // Process category data
      const catStats = processCategoryData(
        categoriesRes.data,
        productsRes.data
      );
      setCategoryData(catStats);

      // Process product performance data
      const productStats = processProductData(productsRes.data, ordersRes.data);
      setProductPerformance(productStats);

      // Process user registration data
      const userRegistrationData = processUserData(usersRes.data);
      setUserStats(userRegistrationData);
    } catch (error) {
      message.error("Failed to fetch analytics data");
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to process data
  const generateSalesData = (orders) => {
    // Demo data - in a real app, this would process actual order dates
    const today = new Date();
    const salesData = [];
    const timeFrames =
      timeRange === "week"
        ? 7
        : timeRange === "month"
        ? 30
        : timeRange === "year"
        ? 12
        : 7;

    // Generate demo data based on time range
    if (timeRange === "year") {
      // Monthly data for a year
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const existingOrders = orders.filter((order) =>
        ["accepted", "shipped", "delivered"].includes(order.status)
      );

      for (let i = 0; i < 12; i++) {
        const month = months[i];
        const matchingOrders = existingOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.getMonth() === i;
        });

        const revenue = matchingOrders.reduce(
          (sum, order) => sum + (order.totalAmount || 0),
          0
        );
        const ordersCount = matchingOrders.length;

        salesData.push({
          date: month,
          value: revenue,
          category: "Revenue",
        });

        salesData.push({
          date: month,
          value: ordersCount * 100, // Scale for visibility
          category: "Orders",
        });
      }
    } else {
      // Daily data for week or month
      for (let i = 0; i < timeFrames; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

        const matchingOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.toDateString() === date.toDateString();
        });

        const revenue = matchingOrders.reduce((sum, order) => {
          if (["accepted", "shipped", "delivered"].includes(order.status)) {
            return sum + (order.totalAmount || 0);
          }
          return sum;
        }, 0);

        const acceptedOrders = matchingOrders.filter((order) =>
          ["accepted", "shipped", "delivered"].includes(order.status)
        ).length;

        salesData.push({
          date: formattedDate,
          value: revenue,
          category: "Revenue",
        });

        salesData.push({
          date: formattedDate,
          value: acceptedOrders * 100, // Scale for visibility
          category: "Orders",
        });
      }

      // Reverse to show chronological order
      salesData.reverse();
    }

    return salesData;
  };

  const processCategoryData = (categories, products) => {
    const categoryStats = categories.map((category) => {
      const productsInCategory = products.filter(
        (product) => product.category && product.category._id === category._id
      );

      return {
        type: category.name,
        value: productsInCategory.length,
      };
    });

    return categoryStats;
  };

  const processProductData = (products, orders) => {
    // Extract top 10 products by sales
    const productSales = {};

    orders.forEach((order) => {
      if (
        ["accepted", "shipped", "delivered"].includes(order.status) &&
        order.items
      ) {
        order.items.forEach((item) => {
          if (item.furniture && item.furniture._id) {
            const productId = item.furniture._id;
            if (!productSales[productId]) {
              productSales[productId] = {
                name: item.furniture.name,
                sales: 0,
                revenue: 0,
              };
            }
            productSales[productId].sales += item.quantity || 1;
            productSales[productId].revenue += item.price * item.quantity || 0;
          }
        });
      }
    });

    // Convert to array and sort by sales
    const productPerformanceData = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10)
      .map((product) => ({
        product: product.name,
        sales: product.sales,
        revenue: product.revenue,
      }));

    return productPerformanceData;
  };

  const processUserData = (users) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const usersByMonth = Array(12).fill(0);

    users.forEach((user) => {
      if (user.createdAt) {
        const registerDate = new Date(user.createdAt);
        const monthIndex = registerDate.getMonth();
        usersByMonth[monthIndex]++;
      }
    });

    const userData = months.map((month, index) => ({
      month,
      users: usersByMonth[index],
    }));

    return userData;
  };

  // Chart configurations
  const salesConfig = {
    data: salesData,
    xField: "date",
    yField: "value",
    seriesField: "category",
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    legend: {
      position: "top",
    },
  };

  const categoryConfig = {
    data: categoryData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name}: {percentage}",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  const productPerformanceConfig = {
    data: productPerformance,
    xField: "product",
    yField: "sales",
    meta: {
      product: {
        alias: "Product",
      },
      sales: {
        alias: "Sales Count",
      },
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
  };

  const userStatsConfig = {
    data: userStats,
    xField: "month",
    yField: "users",
    xAxis: {
      range: [0, 1],
    },
    smooth: true,
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  const renderSkeleton = () => (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" />
    </div>
  );

  const handleRefresh = () => {
    fetchAnalyticsData();
    message.success("Analytics data refreshed");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="mb-0">
            Analytics & Reports
          </Title>
          <Text type="secondary">
            Monitor your business performance with real-time analytics
          </Text>
        </div>
        <Space>
          <Select
            defaultValue="week"
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 120 }}
          >
            <Option value="week">This Week</Option>
            <Option value="month">This Month</Option>
            <Option value="year">This Year</Option>
          </Select>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
            Refresh
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={salesData
                .filter((item) => item.category === "Revenue")
                .reduce((sum, item) => sum + item.value, 0)}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="Rs "
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Average Order Value"
              value={
                salesData
                  .filter((item) => item.category === "Revenue")
                  .reduce((sum, item) => sum + item.value, 0) /
                (salesData
                  .filter((item) => item.category === "Orders")
                  .reduce((sum, item) => sum + item.value, 0) / 100 || 1)
              }
              precision={2}
              valueStyle={{ color: "#1890ff" }}
              prefix="Rs "
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={42.8}
              precision={1}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Sales Analytics",
            children: (
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                  <Card title="Sales & Orders Overview">
                    {loading ? (
                      renderSkeleton()
                    ) : salesData.length > 0 ? (
                      <Line {...salesConfig} />
                    ) : (
                      <Empty description="No sales data available" />
                    )}
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Card title="Category Distribution">
                    {loading ? (
                      renderSkeleton()
                    ) : categoryData.length > 0 ? (
                      <Pie {...categoryConfig} />
                    ) : (
                      <Empty description="No category data available" />
                    )}
                  </Card>
                </Col>
                <Col xs={24}>
                  <Card title="Top Selling Products">
                    {loading ? (
                      renderSkeleton()
                    ) : productPerformance.length > 0 ? (
                      <Column {...productPerformanceConfig} />
                    ) : (
                      <Empty description="No product performance data available" />
                    )}
                  </Card>
                </Col>
              </Row>
            ),
          },
          {
            key: "2",
            label: "User Analytics",
            children: (
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Card title="User Registrations">
                    {loading ? (
                      renderSkeleton()
                    ) : userStats.length > 0 ? (
                      <Area {...userStatsConfig} />
                    ) : (
                      <Empty description="No user data available" />
                    )}
                  </Card>
                </Col>
              </Row>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Analytics;
