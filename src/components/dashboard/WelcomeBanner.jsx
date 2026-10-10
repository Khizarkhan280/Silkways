import { Link } from "react-router-dom";
import { dashboardContent } from "../../config/content";
import { PlusIcon } from "./icons";

export default function WelcomeBanner() {
  const { eyebrow, headingPlain, headingAccent, subtitle, partners, cta } = dashboardContent.banner;

  return (
    <section className="welcome-banner">
      {/* Decorative flight path (hidden on small screens) */}
      <svg
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 text-primary md:block"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMaxYMid meet"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 20 240 Q 220 -20 400 120"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 12"
        />
        <g transform="translate(327 80) rotate(108) scale(2.2) translate(-12 -12)" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </g>
      </svg>

      <div className="relative max-w-xl">
        <p className="welcome-eyebrow">{eyebrow}</p>
        <h1 className="welcome-title">
          {headingPlain} <span className="text-primary">{headingAccent}</span>
        </h1>
        <p className="welcome-subtitle">{subtitle}</p>
        <p className="welcome-partners">{partners}</p>

        <Link to="/dashboard/add-bilty" className="btn-primary mt-6 gap-2">
          <PlusIcon className="h-4 w-4" />
          {cta}
        </Link>
      </div>
    </section>
  );
}