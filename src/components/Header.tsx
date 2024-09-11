import { FaDog } from "react-icons/fa";
import Button from "./ui/Button";
import TextField from "./ui/TextField";

const Header = () => {
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
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
