import React, { useState } from "react";
import { Form, Input, Button, message, Result } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setEmail(values.email);

      const response = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        { email: values.email }
      );

      if (response.status === 200) {
        setSubmitted(true);
        form.resetFields();
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {!submitted ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-4">
              Forgot Password
            </h1>
            <p className="text-gray-600 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Enter your email"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  className="mt-4"
                >
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-4">
              <Link
                to="/"
                className="flex items-center justify-center text-blue-600"
              >
                <ArrowLeftOutlined className="mr-1" /> Back to Login
              </Link>
            </div>
          </>
        ) : (
          <Result
            status="success"
            title="Email Sent!"
            subTitle={`We've sent a password reset link to ${email}. Please check your inbox and follow the instructions to reset your password.`}
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => (window.location.href = "/")}
              >
                Return to Login
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
