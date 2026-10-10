import { useState } from "react";
import { Link } from "react-router-dom";
import { authContent, authAside } from "../../config/content";
import { registerUser, loginUser } from "../../services/authApi";
import logo from "../../assets/silkways-cargo-logo.svg";
import AuthInput from "./AuthInput";
import { UserIcon, MailIcon, LockIcon } from "./icons";

const emptyForm = { name: "", email: "", password: "" };

export default function AuthCard({ mode, onSwitch, onSuccess }) {
  const isSignup = mode === "signup";
  const text = authContent[mode];

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = isSignup
        ? await registerUser(form)
        : await loginUser({ email: form.email, password: form.password });
      onSuccess?.(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    setForm(emptyForm);
    setError("");
    onSwitch();
  };

  return (
    <div className="auth-shell">
      {/* Left brand panel (desktop only) */}
      <aside className="auth-aside">
        <svg
          className="absolute inset-x-0 bottom-0 w-full text-white"
          viewBox="0 0 400 260"
          fill="none"
          aria-hidden="true"
        >
          <path d="M -10 250 Q 200 20 410 170" stroke="currentColor" strokeOpacity="0.5"
            strokeWidth="3" strokeLinecap="round" strokeDasharray="1 10" />
          <g transform="translate(330 128) rotate(118) scale(1.5) translate(-12 -12)" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </g>
        </svg>
        <div className="relative">
          <h2 className="auth-aside-title">{authAside.title}</h2>
          <p className="auth-aside-text">{authAside.text}</p>
        </div>
      </aside>

      {/* Form panel */}
      <div className="auth-panel">
        <Link to="/" aria-label="Home">
          <img src={logo} alt="Silkways Cargo" className="auth-logo" />
        </Link>

        <h1 className="auth-title">{text.title}</h1>
        <p className="auth-subtitle">{text.subtitle}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <AuthInput label="Full name" icon={UserIcon} name="name" type="text"
              placeholder="Your full name" value={form.name} onChange={handleChange} required />
          )}
          <AuthInput label="Email" icon={MailIcon} name="email" type="email"
            placeholder="you@company.com" value={form.email} onChange={handleChange} required />
          <AuthInput label="Password" icon={LockIcon} name="password" type="password"
            placeholder="Enter your password" value={form.password} onChange={handleChange} required />

          {!isSignup && (
            <button type="button" className="auth-link self-end">
              {authContent.forgotPassword}
            </button>
          )}

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Please wait..." : text.button}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {text.switchText}{" "}
          <button type="button" onClick={handleSwitch} className="auth-link">
            {text.switchLink}
          </button>
        </p>
      </div>
    </div>
  );
}