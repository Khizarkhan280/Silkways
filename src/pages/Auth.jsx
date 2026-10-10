import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import { saveSession } from "../services/session";

export default function Auth() {
  const [mode, setMode] = useState("signup"); // default: Create Account
  const navigate = useNavigate();

  const handleSuccess = (data) => {
    if (mode === "signup") {
      setMode("login");
    } else {
      saveSession(data);
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <main className="auth-bg font-sans">
      <AuthCard mode={mode} setMode={setMode} onSuccess={handleSuccess} />
    </main>
  );
}