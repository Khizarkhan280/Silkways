import { MenuIcon, LogoutIcon } from "./icons";

export default function Topbar({ onMenu, onLogout }) {
  return (
    <header className="topbar">
      <button type="button" onClick={onMenu} className="icon-btn lg:hidden" aria-label="Open menu">
        <MenuIcon />
      </button>

      <button type="button" onClick={onLogout} className="btn-outline ml-auto">
        <LogoutIcon className="h-4 w-4" />
        Logout
      </button>
    </header>
  );
}