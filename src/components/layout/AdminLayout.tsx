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
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`base-layout ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <main className={`admin-panel ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default AdminLayout;
