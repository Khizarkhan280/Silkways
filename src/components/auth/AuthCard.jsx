import { useState } from "react";
import { authContent } from "../../config/content";
import { registerUser, loginUser } from "../../services/authApi";
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
    <div className="auth-card">
      <h1 className="auth-title">{text.title}</h1>
      <p className="auth-subtitle">{text.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {isSignup && (
          <AuthInput icon={UserIcon} name="name" type="text" placeholder="Full Name"
            value={form.name} onChange={handleChange} required />
        )}
        <AuthInput icon={MailIcon} name="email" type="email" placeholder="Email id"
          value={form.email} onChange={handleChange} required />
        <AuthInput icon={LockIcon} name="password" type="password" placeholder="Password"
          value={form.password} onChange={handleChange} required />

        <button type="button" className="auth-link self-start">
          {authContent.forgotPassword}
        </button>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Please wait..." : text.button}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-300">
        {text.switchText}{" "}
        <button type="button" onClick={handleSwitch} className="auth-link underline">
          {text.switchLink}
        </button>
      </p>
    </div>
  );
}