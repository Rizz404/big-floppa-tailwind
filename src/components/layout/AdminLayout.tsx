import { useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { UserRole } from "../../types/User";

const AdminLayout = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return user?.role === UserRole.ADMIN ? (
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
  ) : (
    <Navigate to="/" replace />
  );
};
export default AdminLayout;
