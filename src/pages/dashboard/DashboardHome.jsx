import { Link } from "react-router-dom";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import { DocPlusIcon, ReportIcon, ArrowRightIcon } from "../../components/dashboard/icons";

const QUICK_ACTIONS = [
  { title: "Add Bilty", text: "Create a new bilty for shipment", to: "/dashboard/add-bilty", icon: DocPlusIcon },
  { title: "Bilty Report", text: "View and manage all bilty reports", to: "/dashboard/bilty-report", icon: ReportIcon },
];

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-6">
      <WelcomeBanner />

      <div className="grid gap-4 sm:grid-cols-2">
        {QUICK_ACTIONS.map(({ title, text, to, icon: Icon }) => (
          <Link key={to} to={to} className="dash-card group">
            <span className="dash-card-icon">
              <Icon className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-brand">{title}</span>
              <span className="block text-sm text-muted">{text}</span>
            </span>
            <ArrowRightIcon className="h-5 w-5 text-line transition group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}