import { BiBook } from "react-icons/bi";
import { FaDog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  isSidebarOpen: boolean;
}

const AdminSidebar = ({ isSidebarOpen }: AdminSidebarProps) => {
  return (
    isSidebarOpen && (
      <aside className={`admin-aside ${isSidebarOpen ? "open" : "closed"}`}>
        <nav className="admin-aside-nav">
          <div className="admin-aside-brand">
            <FaDog /> Big floppa
          </div>
          <div className="admin-aside-nav-links flex-col base-gap">
            {[
              "cats",
              "users",
              "breeds",
              "orders",
              "transactions",
              "payment methods",
              "shipping services",
              "discount",
            ].map((item, index) => (
              <NavLink
                className="admin-aside-nav-link"
                to={`${item.includes(" ") ? item.replace(" ", "-") : item}`}
                key={index}
              >
                <span>
                  <BiBook /> {item}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    )
  );
};
export default AdminSidebar;
