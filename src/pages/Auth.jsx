import { useState } from "react";
import AuthCard from "../components/auth/AuthCard";

export default function Auth() {
  const [mode, setMode] = useState("signup"); // default: Create Account

  const toggleMode = () => setMode((m) => (m === "signup" ? "login" : "signup"));

  const handleSuccess = (data) => {
    if (mode === "signup") {
      setMode("login");
    } else {
      console.log("Logged in:", data); // TODO: save token + redirect
    }
  };

  return (
    <main className="auth-bg font-sans">
      <AuthCard mode={mode} onSwitch={toggleMode} onSuccess={handleSuccess} />
    </main>
  );
}