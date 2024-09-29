import { FaDog } from "react-icons/fa";
import Button from "./ui/Button";
import TextField from "./ui/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BiBell, BiCart, BiMessage } from "react-icons/bi";
import { useLogout } from "../hooks/authHooks";
import { useState } from "react";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate: logout, isPending: isPendingLogout } = useLogout();
  const [show, setShow] = useState(false);

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
          <NavLink to="/message" className="rounded p-2 hover:bg-slate-300">
            <BiMessage />
          </NavLink>
        </div>
        <div className="flex items-center gap-2 rounded-md border-x px-3 py-2 hover:bg-slate-300">
          <FaDog className="text-2xl" />
          <span>Sell Cat</span>
        </div>
        <div className="relative flex items-center justify-between gap-3">
          {user ? (
            <>
              <NavLink
                to="/user-settings"
                className="flex items-center justify-between gap-2 rounded-md px-3 py-2 hover:bg-slate-300"
                onMouseEnter={() => setShow(true)} // * Set setShow menjadi true saat di-hover
                onMouseLeave={() => setShow(false)} // * Set setShow menjadi false saat mouse leave
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

              {show && (
                <div
                  className="absolute right-0 top-12 z-10 w-72 rounded bg-slate-200 p-2"
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 shadow-md">
                    <img
                      src={
                        user.profile?.profilePicture ||
                        "https://i.pinimg.com/474x/f0/8e/7c/f08e7c7b45981e078036308e45110082.jpg"
                      }
                      alt="profile picture"
                      className="h-10 w-10 rounded-full object-cover object-center"
                    />
                    <div>
                      <p className="font-bold">{user.username}</p>
                      <span className="text-sm">Silver member</span>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <img
                        src="https://i.pinimg.com/236x/b7/4a/90/b74a90adfb0c740556d12dc46af504c9.jpg"
                        alt="banner"
                        className="w-full rounded object-cover"
                      />
                    </div>
                    <ul className="flex flex-col items-start justify-between">
                      <div>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-slate-200">
                          History
                        </li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-slate-200">
                          Wishlist
                        </li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-slate-200">
                          Favorite Seller
                        </li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-slate-200">
                          Settings
                        </li>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => logout()}
                        disabled={isPendingLogout}
                      >
                        Logout
                      </Button>
                    </ul>
                  </div>
                </div>
              )}
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
