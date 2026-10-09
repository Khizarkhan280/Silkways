import { Link } from "react-router-dom";
import logo from "../assets/silkways-cargo-logo.svg";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-14">
      <Link to="/" aria-label="Home">
        <img src={logo} alt="Silkways Cargo" className="h-12 w-auto" />
      </Link>
    </header>
  );
}