import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Check your email for the login link");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login / Signup</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Sending link..." : "Send Login Link"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
