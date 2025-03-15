import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiShoppingBag,
  FiLogOut,
  FiGrid,
  FiPieChart, // Add new icon for Analytics
} from "react-icons/fi";
import { motion } from "framer-motion";

export const SideNavBar = () => {
  return (
    <div className="flex bg-indigo-50 h-full">
      <Sidebar />
      {/* Add an empty div that takes the same width as the sidebar to prevent content shift */}
      <div className="invisible shrink-0" style={{ width: "225px" }}></div>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="fixed left-0 top-0 bottom-0 overflow-y-auto border-r border-slate-300 bg-white p-2 flex flex-col z-10"
      style={{
        width: open ? "225px" : "60px", // Adjusted for collapsed state
        height: "100vh",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1 flex-grow overflow-y-auto">
        <Option
          Icon={FiGrid}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/dashboard"
        />
        <Option
          Icon={FiUsers}
          title="Users"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/dashboard/users"
        />
        <Option
          Icon={FiShoppingCart}
          title="Products"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/dashboard/products"
        />
        <Option
          Icon={FiShoppingBag}
          title="Orders"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/dashboard/orders"
        />
        {/* <Option
          Icon={FiDollarSign}
          title="Sales"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/dashboard/sales"
        /> */}
        <Option
          Icon={FiPieChart}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/dashboard/analytics"
        />
        {/* <Option
          Icon={FiBarChart}
          title="Reports"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/dashboard/stats"
        /> */}
        <Option
          Icon={FiMonitor}
          title="View Site"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/home"
        />
      </div>

      {/* Logout button at bottom */}
      <div className="mt-auto border-t border-slate-300 pt-2">
        <Option
          Icon={FiLogOut}
          title="Logout"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/"
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs, path }) => {
  return (
    <Link to={path}>
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          selected === title
            ? "bg-indigo-100 text-indigo-800"
            : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}

        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">WoodCraft</span>
              <span className="block text-xs text-slate-500">Admin DashBoard</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="border-t border-slate-300 transition-colors hover:bg-slate-100 mt-2"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
