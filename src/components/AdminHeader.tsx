import { CgNotes } from "react-icons/cg";
import Button from "./ui/Button";
import { BiMenu } from "react-icons/bi";
import { useLogout } from "../hooks/authHooks";

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminHeader = ({ isSidebarOpen, toggleSidebar }: AdminHeaderProps) => {
  const { mutate, isPending } = useLogout();

  return (
    <header className="admin-header">
      <nav className="admin-nav base-container flex-between base-gap">
        <div className="admin-nav-left flex-between base-gap">
          {/* <button type="button" onClick={toggleSidebar} className="icon-button">
            <BiMenu />
          </button> */}
          <div className="admin-nav-brand flex-between">
            <CgNotes className="logo" />
            <p className="logo-text">Big Floppa</p>
          </div>
        </div>
        <div className="admin-nav-auth">
          <Button type="button" onClick={() => mutate()} disabled={isPending}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};
export default AdminHeader;
