import { FaDog } from "react-icons/fa";
import Button from "./ui/Button";
import TextField from "./ui/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BiBell, BiCart, BiMessage } from "react-icons/bi";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-10 w-full border-b bg-slate-100">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <NavLink
          to="/"
          className="flex items-center justify-between gap-2 text-orange-500"
        >
          <FaDog className="text-2xl" />
          <span className="text-2xl font-semibold">Big Floppa</span>
        </NavLink>
        <div className="w-1/2">
          <TextField type="search" placeholder="search some cat" />
        </div>
        <div className="flex items-center justify-between gap-3">
          {user ? (
            <>
              <div className="flex items-center justify-between gap-2 text-2xl">
                <NavLink to="/cart" className="rounded p-2 hover:bg-slate-300">
                  <BiCart />
                </NavLink>
                <NavLink
                  to="/notification"
                  className="rounded p-2 hover:bg-slate-300"
                >
                  <BiBell />
                </NavLink>
                <NavLink
                  to="/message"
                  className="rounded p-2 hover:bg-slate-300"
                >
                  <BiMessage />
                </NavLink>
              </div>
              <div className="flex items-center gap-2 rounded-md border-x px-3 py-2 hover:bg-slate-300">
                <FaDog className="text-2xl" />
                <span>Sell Cat</span>
              </div>
              <NavLink
                to="/user-settings"
                className="flex items-center justify-between gap-2 rounded-md px-3 py-2 hover:bg-slate-300"
              >
                <img
                  src={
                    user.profile?.profilePicture ||
                    "https://i.pinimg.com/474x/f0/8e/7c/f08e7c7b45981e078036308e45110082.jpg"
                  }
                  alt="profile picture"
                  className="h-8 w-8 rounded-full object-cover object-center"
                />
                <span>{user.username}</span>
              </NavLink>
            </>
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
