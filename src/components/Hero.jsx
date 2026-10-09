import { Link } from "react-router-dom";
import { homeContent } from "../config/content";

// Placeholder icon in the circle (like the robot in the reference).
// Swap with <img src={...} /> of your own illustration if you want.
function PlaneIcon() {
  return (
    <svg className="h-12 w-12 text-brand" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

export default function Hero() {
  const { title, subtitle, partners, loginLabel, loginPath } = homeContent;

  return (
    <section className="flex flex-col items-center px-6 pt-10 text-center md:pt-16">
      <div className="avatar-circle">
        <PlaneIcon />
      </div>

      <h1 className="mt-10 max-w-3xl text-4xl font-semibold text-brand md:text-5xl">
        {title}
      </h1>

      <p className="mt-4 text-xl font-medium text-brand">{subtitle}</p>
      <p className="mt-2 max-w-md text-sm text-muted">{partners}</p>

      <Link to={loginPath} className="btn-outline mt-8">
        {loginLabel}
      </Link>
    </section>
  );
}
