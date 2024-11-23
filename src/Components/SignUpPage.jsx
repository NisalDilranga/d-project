import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = (values) => {
    const { email, password, confirmPassword } = values;

    // Basic validation for password match
    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    // Mock signup process (you can replace this with actual API logic)
    if (email && password) {
      message.success("Sign-up successful!");
      setTimeout(() => {
        navigate("/login"); 
      }, 2000); // 2-second delay
    } else {
      message.error("Please fill out all fields correctly!");
    }
  };

  return (
    <div className="flex  justify-center flex-col border mx-[400px] mt-20" style={{ padding: "50px" }}>
      <h2>Sign Up</h2>
      <Form
        name="signup"
        onFinish={handleSignUp}
        initialValues={{
          remember: true,
        }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <div className="login-footer">
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
