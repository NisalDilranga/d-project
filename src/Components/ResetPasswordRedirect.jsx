import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";

const ResetPasswordRedirect = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Log for debugging
    console.log("Redirecting with token:", token);

    // Redirect to the actual reset password page with the token
    navigate(`/reset-password/${token}`, { replace: true });
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Spin size="large" />
      <p className="mt-4 text-gray-600">
        Redirecting to password reset page...
      </p>
    </div>
  );
};

export default ResetPasswordRedirect;
