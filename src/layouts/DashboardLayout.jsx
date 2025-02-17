import { Outlet } from "react-router-dom";
import { SideNavBar } from "../Components/admin-dashboard/SideNavBar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <SideNavBar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
