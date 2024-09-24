import { FaDog } from "react-icons/fa";
import Button from "./ui/Button";
import TextField from "./ui/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-10 w-full border-b bg-slate-100">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center justify-between gap-2 text-orange-500">
          <FaDog className="text-2xl" />
          <span className="text-2xl font-semibold">Big Floppa</span>
        </div>
        <div className="">
          <TextField type="search" placeholder="search some cat" />
        </div>
        <div className="">
          {user ? (
            <NavLink to="/user-settings">
              <img
                src={
                  user.profile?.profilePicture ||
                  "https://i.pinimg.com/474x/f0/8e/7c/f08e7c7b45981e078036308e45110082.jpg"
                }
                alt="profile picture"
                className="h-8 w-8 rounded-full object-cover object-center"
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
