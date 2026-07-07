import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative h-screen">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
