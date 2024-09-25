import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
  return (
    <div className="relative">
      <Header />
      <main className="container mx-auto mt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
