import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role || "user", // Default to "user" if role is not selected
        }
      );

      if (response.data.success) {
        message.success("Registration successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <Form
          name="register"
          layout="vertical"
          onFinish={handleRegister}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

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

          {/* <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select a role!",
              },
            ]}
          >
            <Select placeholder="Select your role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="mb-4">
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <span className="text-gray-600">Already have an account?</span>
          <Button type="link" onClick={() => navigate("/")}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
