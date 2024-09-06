import { useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <div
        className={`admin-layout ${
          !isSidebarOpen ? "admin-aside-closed" : "admin-aside-open"
        }`}
      >
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <AdminHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main
          className={`admin-panel ${isSidebarOpen ? "admin-aside-open" : ""}`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default AdminLayout;
