import { FaDog } from "react-icons/fa";
import Button from "./ui/Button";
import TextField from "./ui/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="nav flex-between base-gap">
        <div className="nav-brand flex-between">
          <FaDog />
          Big Floppa
        </div>
        <div className="nav-center">
          <TextField type="search" placeholder="search some cat" />
        </div>
        <div className="nav-right flex-between base-gap">
          {user ? (
            <NavLink to="/user-profile">
              <img
                src={
                  user.profile?.profilePicture ||
                  "https://i.pinimg.com/474x/f0/8e/7c/f08e7c7b45981e078036308e45110082.jpg"
                }
                alt="profile picture"
                className="nav-profile-picture"
              />
            </NavLink>
          ) : (
            <>
              <Button type="button" onClick={() => navigate("/auth")}>
                Login
              </Button>
              <Button type="button" onClick={() => navigate("/auth")}>
                Register
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
