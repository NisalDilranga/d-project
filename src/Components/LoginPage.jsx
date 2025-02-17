
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.data.success) {
        message.success("Login successful!");
        const accessToken = response.data.token;
        Cookies.set("accessToken", accessToken, { expires: 1 });
        setTimeout(() => {
          const userRole = response.data.user.role;
          if (userRole === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/home");
          }
        }, 2000);
      } else {
        message.error(response.data.message || "Invalid username or password!");
      }
    } catch (error) {
      message.error("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="mb-4">
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-between text-sm">
          <Button
            type="link"
            onClick={() => message.info("Forgot password clicked!")}
          >
            Forgot Password?
          </Button>
          <Button type="link" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
