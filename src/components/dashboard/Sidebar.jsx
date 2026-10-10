import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/silkways-cargo-logo.svg";
import { dashboardContent } from "../../config/content";
import { HomeIcon, DocPlusIcon, ReportIcon } from "./icons";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", icon: HomeIcon, end: true },
  { label: "Add Bilty", to: "/dashboard/add-bilty", icon: DocPlusIcon },
  { label: "Bilty Report", to: "/dashboard/bilty-report", icon: ReportIcon },
];

export default function Sidebar({ open, onClose }) {
  const { tagline } = dashboardContent;

  return (
    <>
      {/* Dark overlay behind the drawer (mobile only) */}
      {open && (
        <div className="fixed inset-0 z-30 bg-brand/40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        className={`sidebar ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Link to="/dashboard" onClick={onClose} className="sidebar-logo" aria-label="Dashboard home">
          <img src={logo} alt="Silkways Cargo" className="h-10 w-auto" />
        </Link>

        <nav className="mt-8 flex flex-col gap-2" aria-label="Main">
          {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `nav-item${isActive ? " nav-item-active" : ""}`}
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-2 pt-8">
          <p className="text-lg font-semibold leading-tight">{tagline.line1}</p>
          <p className="text-lg font-semibold leading-tight text-primary-light">{tagline.line2}</p>
        </div>
      </aside>
    </>
  );
}