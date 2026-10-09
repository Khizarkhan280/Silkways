import { Link } from "react-router-dom";
import Logo from "../assets/Logo";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-14">
      <Link to="/" aria-label="Home">
        <Logo className="h-8 w-auto" />
      </Link>
    </header>
  );
}
