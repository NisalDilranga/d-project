import React from "react";
import { Outlet } from "react-router-dom";
import { SideNavBar } from "../Components/admin-dashboard/SideNavBar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SideNavBar />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
