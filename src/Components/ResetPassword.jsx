import React, { useState } from "react";
import { Form, Input, Button, message, Result } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:3000/api/auth/reset-password/${token}`,
        { password: values.newPassword }
      );

      if (response.status === 200) {
        setResetSuccess(true);
        form.resetFields();

        // Redirect to login after a delay
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to reset password. The token may be invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <Result
            status="success"
            title="Password Reset Successful!"
            subTitle="Your password has been reset successfully. You will be redirected to the login page in a few seconds."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => navigate("/")}
              >
                Go to Login
              </Button>,
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Reset Your Password
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your new password below.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="New Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm New Password"
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
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
