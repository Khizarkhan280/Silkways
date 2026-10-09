import { Link } from "react-router-dom";
import { homeContent } from "../config/content";

export default function Hero() {
  const { title, subtitle, partners, loginLabel, loginPath } = homeContent;

  return (
    <section className="relative z-10 flex flex-col items-center px-6 pb-12 pt-2 text-center lg:pb-24 lg:pt-44">
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
      <p className="hero-partners">{partners}</p>

      <Link to={loginPath} className="btn-primary group mt-10 gap-2 px-12">
        {loginLabel}
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </Link>
    </section>
  );
}