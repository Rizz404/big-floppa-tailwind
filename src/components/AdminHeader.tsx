import { CgNotes } from "react-icons/cg";

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminHeader = ({ isSidebarOpen, toggleSidebar }: AdminHeaderProps) => {
  return (
    <header className="header">
      <nav className="nav base-container flex-between base-gap">
        <div className="nav-brand flex-between">
          <CgNotes className="logo" />
          <p className="logo-text">Big Floppa</p>
        </div>
        <div className="nav-auth">
          <button type="button" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
          <button type="button">Logout</button>
        </div>
      </nav>
    </header>
  );
};
export default AdminHeader;
