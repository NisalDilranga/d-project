import { Outlet } from "react-router-dom";
import { SideNavBar } from "../Components/admin-dashboard/SideNavBar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
