import "./App.css";
import Cart from "./Components/cart/Cart";
import Electronics from "./Components/categories/Electronics";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import Home from "./templates/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="/categories/electronics" element={<Electronics />} />
            <Route path="/cart" element={<Cart />} />

            {/* <Route path="/signup" element={<SignupPage />} /> */}
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
