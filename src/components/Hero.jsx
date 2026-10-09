import { Link } from "react-router-dom";
import { homeContent } from "../config/content";

export default function Hero() {
  const { title, subtitle, partners, loginLabel, loginPath } = homeContent;

  return (
    <section className="relative z-10 flex flex-col items-center px-6 pb-24 pt-32 text-center md:pt-44">
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
      <p className="hero-partners">{partners}</p>

      <Link to={loginPath} className="btn-primary mt-10 px-12">
        {loginLabel}
      </Link>
    </section>
  );
}