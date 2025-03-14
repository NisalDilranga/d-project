import "./App.css";
import Cart from "./Components/cart/Cart";
import Electronics from "./Components/categories/Electronics";
import LivingRoom from "./Components/categories/LivingRoom";
import DiningKitchen from "./Components/categories/DiningKitchen";
import BedroomFurniture from "./Components/categories/BedroomFurniture";
import OfficeStudy from "./Components/categories/OfficeStudy";
import OutdoorPatio from "./Components/categories/OutdoorPatio";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import Home from "./templates/Home";
import { SideNavBar } from "./Components/admin-dashboard/SideNavBar";
import ProductDetails from "./pages/ProductDetails";
import OrderHistory from "./Components/orders/OrderHistory";
import Contact from "./Pages/Contact";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "react-use-cart";
import Cookies from "js-cookie"; // For checking authentication
import DashboardLayout from "./layouts/DashboardLayout";
import UsersManagement from "./Components/admin-dashboard/pages/UsersManagement";
import ProductsManagement from "./Components/admin-dashboard/pages/ProductsManagement";
import OrdersManagement from "./Components/admin-dashboard/pages/OrdersManagement"; // Add this import at the top

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!Cookies.get("accessToken"); // Check if the user is logged in

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes */}
            {/* <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/categories/electronics"
              element={
                <ProtectedRoute>
                  <Electronics />
                </ProtectedRoute>
              }
            />

            {/* Furniture Category Routes */}
            <Route
              path="/categories/living-room"
              element={
                <ProtectedRoute>
                  <LivingRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/dining-kitchen"
              element={
                <ProtectedRoute>
                  <DiningKitchen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/bedroom-furniture"
              element={
                <ProtectedRoute>
                  <BedroomFurniture />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/office-study"
              element={
                <ProtectedRoute>
                  <OfficeStudy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/outdoor-patio"
              element={
                <ProtectedRoute>
                  <OutdoorPatio />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            {/* admin dash routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<UsersManagement />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="sales" element={<Cart />} />
              <Route path="orders" element={<OrdersManagement />} />
            </Route>

            {/* Product Details Route */}
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />

            {/* Order History Route */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route (Redirect to Login if no route matches) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
