import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { clearSession } from "../../services/session";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession(); // TODO: call your backend logout API here if you have one
    navigate("/login", { replace: true });
  };

  return (
    <div className="dash-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto px-4 pb-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}