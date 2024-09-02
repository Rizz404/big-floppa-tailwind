import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  isSidebarOpen: boolean;
}

const AdminSidebar = ({ isSidebarOpen }: AdminSidebarProps) => {
  return (
    isSidebarOpen && (
      <aside
        className={`aside ${
          isSidebarOpen ? "aside-width" : "aside-width-closed"
        }`}
      >
        <nav className="sidebar">
          <div className="sidebar-links flex-col base-gap">
            {["cats", "users", "breeds", "orders", "transactions"].map(
              (item, index) => (
                <NavLink className="sidebar-link" to={`${item}`} key={index}>
                  {item}
                </NavLink>
              )
            )}
          </div>
        </nav>
      </aside>
    )
  );
};
export default AdminSidebar;
