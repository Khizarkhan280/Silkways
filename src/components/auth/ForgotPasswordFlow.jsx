import { useState } from "react";
import { forgotContent } from "../../config/content";
import { sendResetOtp, resetPassword } from "../../services/authApi";
import AuthInput from "./AuthInput";
import OtpInput from "./OtpInput";
import { MailIcon, LockIcon } from "./icons";

const OTP_LENGTH = 6;

export default function ForgotPasswordFlow({ onBack, onDone }) {
  const [step, setStep] = useState("email"); // email | otp | password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const text = forgotContent[step];

  const run = async (action) => {
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await action();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === "email") {
      return run(async () => {
        await sendResetOtp({ email });
        setStep("otp");
      });
    }

    if (step === "otp") {
      if (otp.length < OTP_LENGTH) return setError(`Enter all ${OTP_LENGTH} digits.`);
      setError("");
      return setStep("password");
    }

    run(async () => {
      await resetPassword({ email, otp, newPassword });
      onDone();
    });
  };

  const handleResend = () =>
    run(async () => {
      await sendResetOtp({ email });
      setInfo("A new code has been sent to your email.");
    });

  const backActions = {
    email: { label: "Back to login", action: onBack },
    otp: { label: "Change email", action: () => { setError(""); setInfo(""); setStep("email"); } },
    password: { label: "Re-enter code", action: () => { setError(""); setOtp(""); setStep("otp"); } },
  };
  const back = backActions[step];

  return (
    <>
      <h1 className="auth-title">{text.title}</h1>
      <p className="auth-subtitle">{text.subtitle}</p>

      <form onSubmit={handleSubmit} className="auth-form">
        {step === "email" && (
          <AuthInput label="Email" icon={MailIcon} name="email" type="email"
            placeholder="you@company.com" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        )}

        {step === "otp" && (
          <>
            <OtpInput onChange={setOtp} length={OTP_LENGTH} />
            <button type="button" onClick={handleResend} disabled={loading} className="auth-link self-end">
              Resend code
            </button>
          </>
        )}

        {step === "password" && (
          <AuthInput label="New password" icon={LockIcon} name="newPassword" type="password"
            placeholder="Enter new password" value={newPassword} minLength={6}
            onChange={(e) => setNewPassword(e.target.value)} required />
        )}

        {info && <p className="auth-info" role="status">{info}</p>}
        {error && <p className="auth-error" role="alert">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Please wait..." : text.button}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        <button type="button" onClick={back.action} className="auth-link">
          {back.label}
        </button>
      </p>
    </>
  );
}